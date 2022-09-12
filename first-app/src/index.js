import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import theme from './Theme';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';

let userName = prompt('Введите ваше имя');





const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(userName);
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App userName={userName} />
  </ThemeProvider>
  // {/* </React.StrictMode> */ }
);

reportWebVitals();
