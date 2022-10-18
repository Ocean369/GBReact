import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import theme from './pages/Theme';
import { ThemeProvider } from '@mui/material/styles';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </PersistGate> */}
    </ThemeProvider>
  </BrowserRouter>
  ,

);

reportWebVitals();
