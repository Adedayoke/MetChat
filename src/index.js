import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { CurrentChatContextProvider } from './context/CurrentChatContext';
import { NavigateProvider } from './context/NavigateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <CurrentChatContextProvider>
          <NavigateProvider>
          <App />
          </NavigateProvider>
        </CurrentChatContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
