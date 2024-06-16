import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import firebase from './firebase';
import { getAnalytics } from 'firebase/analytics';
console.log(firebase);
console.log(getAnalytics);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

