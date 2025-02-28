# Readr - Interactive Reading Practice

An interactive reading application built with React, TypeScript, and Vite that helps users practice reading stories out loud. The app uses speech recognition to track reading progress and provide an engaging learning experience.

🌐 **Try it out**: [https://jlambert23.github.io/readr/](https://jlambert23.github.io/readr/)

## Features

- 📚 Multiple story selection
- 🎤 Real-time speech recognition
- 📝 Word-by-word progress tracking
- 🌟 Encouraging completion messages
- 🎯 Interactive UI with visual feedback

## Technical Stack

- React + TypeScript
- Vite for build tooling
- Speech Recognition API
- ESLint for code quality

## Development Setup

This project uses Vite with HMR and ESLint rules. It uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) which leverages [Babel](https://babeljs.io/) for Fast Refresh.

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Browser Support

This application uses the Web Speech API for speech recognition. The following browsers currently support this feature:

- **Chrome (desktop)**
- **Safari 14.1+**
- **Microsoft Edge**
- **Chrome (Android)**: Note: Android OS may produce a beeping sound when activating the microphone
- **Android WebView**
- **Samsung Internet**
