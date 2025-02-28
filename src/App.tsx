import { useCallback, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import { stories } from './data/stories';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState(stories[0]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [completedStories, setCompletedStories] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedStories');
    return saved ? JSON.parse(saved) : [];
  });

  const markStoryComplete = useCallback((storyId: number) => {
    if (!completedStories.includes(storyId)) {
      setCompletedStories([...completedStories, storyId]);
    }
  }, [completedStories]);

  const areAllStoriesCompleted = useCallback(() => {
    return stories.every(story => completedStories.includes(story.id));
  }, [completedStories]);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      const storyWords = selectedStory.text.toLowerCase().split(/\s+/);
      const words = transcript.toLowerCase().split(/\s+/);
      
      const lastSpokenWord = words[words.length - 1];
      
      if (lastSpokenWord) {
        const nextExpectedWord = storyWords[currentWordIndex]?.replace(/[.,!?]/, '');
        if (lastSpokenWord === nextExpectedWord) {
          setCurrentWordIndex(currentWordIndex + 1);
        }
      }
    }
  }, [transcript, currentWordIndex, selectedStory.text]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log('Microphone permission granted');
        setError(null);
      })
      .catch((err: Error) => {
        console.error('Error accessing microphone:', err);
        setError('Microphone access denied. Please allow microphone access in your browser settings.');
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('completedStories', JSON.stringify(completedStories));
  }, [completedStories]);

  useEffect(() => {
    const words = selectedStory.text.split(/\s+/);
    const isStoryComplete = currentWordIndex >= words.length;
    if (isStoryComplete) {
      markStoryComplete(selectedStory.id);
    }
  }, [currentWordIndex, selectedStory, markStoryComplete]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn't support speech recognition.</div>;
  }

  if (!isMicrophoneAvailable) {
    return <div>Please allow microphone access to use speech recognition.</div>;
  }

  const startListening = () => {
    console.log('Starting speech recognition...');
    try {
      resetTranscript();
      setCurrentWordIndex(0);
      SpeechRecognition.startListening({ continuous: true });
      setError(null);
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError('Failed to start speech recognition. Please try again.');
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all reading progress? This cannot be undone.')) {
      setCompletedStories([]);
      localStorage.removeItem('completedStories');
      setCurrentWordIndex(0);
      resetTranscript();
    }
  };

  const renderText = () => {
    const words = selectedStory.text.split(/\s+/);
    const isStoryComplete = currentWordIndex >= words.length;
    const currentStoryIndex = stories.findIndex(s => s.id === selectedStory.id);
    const nextStory = stories[(currentStoryIndex + 1) % stories.length];

    const handleNextStory = () => {
      setSelectedStory(nextStory);
      resetTranscript();
      setCurrentWordIndex(0);
    };

    return (
      <>
        {words.map((word, index) => (
          <span
            key={index}
            className={`word ${index < currentWordIndex ? 'word-read' : 'word-unread'}`}
          >
            {word}
          </span>
        ))}
        {isStoryComplete && (
          <div className="completion-message">
            {areAllStoriesCompleted() ? (
              <h3 className="completion-title">
                🎓 Congratulations! You've completed all the stories! 🏆
                <br/>
                <span className="completion-subtitle">You're an amazing reader! Keep it up! 🌈</span>
              </h3>
            ) : (
              <h3 className="completion-title">
                🌟 Wow! Amazing Job! 🎉
                <br/>
                <span className="completion-subtitle">You're a super star reader! ⭐️</span>
              </h3>
            )}
            <button 
              onClick={handleNextStory}
              className="control-button next-story-button"
            >
              📖 Read "{nextStory.title}" next!
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="gradient-background">
      <h1 className="main-title">Let's Read Together! 📚</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="story-selector-container">
        <div className="story-selector-flex">
          <select 
            value={selectedStory.id}
            className="story-select"
            onChange={(e) => {
              const story = stories.find(s => s.id === Number(e.target.value));
              if (story) {
                setSelectedStory(story);
                resetTranscript();
                setCurrentWordIndex(0);
              }
            }}
          >
            {stories.map(story => (
              <option 
                key={story.id} 
                value={story.id}
              >
                {story.title} {completedStories.includes(story.id) ? '✅' : ''}
              </option>
            ))}
          </select>
          <button 
            onClick={handleResetProgress}
            className="reset-progress-button"
            title="Clear all reading progress"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="reading-area">
        {renderText()}
      </div>

      <div className="controls-container">
        <button 
          onClick={listening ? SpeechRecognition.stopListening : startListening}
          className={`control-button ${listening ? 'stop-button' : 'start-button'}`}
        >
          {listening ? '🤫 Stop Reading' : '🎤 Start Reading'}
        </button>
        <button 
          onClick={() => {
            resetTranscript();
            setCurrentWordIndex(0);
          }}
          className="control-button reset-button"
        >
          🔄 Start Over
        </button>
      </div>

      <div className="transcript-section">
        <button
          onClick={() => setShowTranscript(prev => !prev)}
          className="transcript-toggle"
        >
          {showTranscript ? '🔼' : '🔽'} Show/Hide Reading Status
        </button>
        
        <div className={`collapsible-content ${showTranscript ? 'open' : ''}`}>
          <div className={`status-message ${!listening && 'status-inactive'}`}>
            {listening ? '🎙️ Your microphone is ON!' : '🎙️ Click Start Reading to begin!'}
          </div>

          <div className="transcript-box">
            <h3 className="transcript-title">
              🗣️ I heard you say:
            </h3>
            <div className="transcript-text">
              {transcript}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
