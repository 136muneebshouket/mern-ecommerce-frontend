import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import axios from 'axios';


// const api = axios.create({
//   baseURL:"http://localhost:8000"
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Modify the request config here (e.g., add headers, intercept requests)
//     console.log('Request Interceptor');
//     return config;
//   },
//   (error) => {
//     // Handle request errors here
//     console.error('Request Error');
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Modify the response data here (e.g., transform response, handle errors)
//     console.log('Response Interceptor');
//     return response;
//   },
//   (error) => {
//     // Handle response errors here
//     console.error('Response Error');
//     return Promise.reject(error);
//   }
// );
    








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// var Scrollbar = window.Scrollbar;

// Scrollbar.init(document.querySelector('body'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
