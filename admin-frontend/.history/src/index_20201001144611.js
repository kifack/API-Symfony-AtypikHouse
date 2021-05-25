import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import HeaderBack from './components/backend/HeaderBack';


const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HeaderBack />
    </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);


