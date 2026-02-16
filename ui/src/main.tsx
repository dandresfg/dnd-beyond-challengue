import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { LogProvider } from './context/LogContext';
import { GameProvider } from './context/GameContext';
import App from './App';

const theme = createTheme({
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#151b2b',
      '#101622',
      '#0d1119',
      '#080b10',
    ],
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <LogProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </LogProvider>
    </MantineProvider>
  </React.StrictMode>,
);
