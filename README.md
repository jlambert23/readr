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

This project uses Vite with HMR and ESLint rules. Two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

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
```
