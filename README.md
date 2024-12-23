# DBC_app# Denver Biscuit Company Review Generator 🍽️

## Created by : Ricky Terrero
## Undergrad at University of Colorado Denver BA CS

## Overview
A React Native mobile application developed for Artificial Connections (AC) that generates restaurant reviews using OpenAI's GPT-4o-mini, specifically tailored for Denver Biscuit Company.

## 🚀 Project Features

- AI-powered review generation
- Server name personalization
- Clipboard copy functionality
- Dynamic loading states
- Responsive design

## 🧠 Key React Native Concepts Learned

### State Management with `useState`
The project demonstrates advanced state management using React Hooks:

```typescript
// State declaration pattern
const [loading, setLoading] = useState(false);
```

#### Key Insights:
- `useState` hook for declarative state management
- Multiple state variables for different UI concerns
  - `review`: Stores generated review text
  - `loading`: Manages loading state
  - `serverName`: Tracks user-input server name

### State Usage Patterns
- Conditional rendering based on state
- Disabling UI elements during asynchronous operations
- Updating UI dynamically with state changes

### Asynchronous Operations
- Async/await with error handling
- State management during API calls
- Implementing loading indicators

## 🛠 Technologies Used
- React Native
- OpenAI API (GPT-4o-mini)
- TypeScript
- Expo

## 📦 Dependencies
- react-native
- openai
- @react-native/clipboard

## 🔧 Setup and Installation

### Prerequisites
- Node.js
- npm 
- Expo CLI
- OpenAI API Key

### Installation Steps
1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file and add your OpenAI API key
4. Run the application
   ```bash
   expo start
   ```


## 📱 Usage
1. Enter server's name (optional)
2. Click "Generate Review"
3. View AI-generated review
4. Copy review to clipboard if desired


