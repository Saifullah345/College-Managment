<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { App } from './App';
=======
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { App } from "./App";
>>>>>>> bafb7569c0e3cf0b5ea2f8c4e87741b8afbb2331

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
