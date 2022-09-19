import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import theme from './pages/Theme';
import { ThemeProvider } from '@mui/material/styles';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,

);

reportWebVitals();
