import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './main';
import reportWebVitals from './reportWebVitals';
import customTheme from "./themes/theme";
import CSSReset from '@chakra-ui/css-reset';
import { ChakraProvider } from '@chakra-ui/react';


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Main />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
