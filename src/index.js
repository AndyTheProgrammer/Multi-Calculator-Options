import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styling/customCss.css'
import App from './App'

// import '../node_modules/jquery/dist/jquery.js'
import '../node_modules/slick-carousel/slick/slick.css'
import '../node_modules/slick-carousel/slick/slick-theme.css'


import { BrowserRouter as Router } from 'react-router-dom'
import RouterLinks from './routes/routerLinks'
import { store } from "./redux/store";
import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <RouterLinks />
        <App/>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root') 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
