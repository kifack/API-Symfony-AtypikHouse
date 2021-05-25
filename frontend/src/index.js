import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import setAuthorizationToken from "./tools/setAuthorizationToken";
import jwt from "jsonwebtoken";
import { userData, loadingData } from "./actions";

const store = configureStore();

if(localStorage.jwtToken){

  
    setAuthorizationToken(localStorage.jwtToken);
    let dataToken = jwt.decode(localStorage.jwtToken);
    store.dispatch(userData(dataToken.username)); 
    setTimeout(function() {
      store.dispatch(loadingData());
    },1000)
   
}else{
    
    setTimeout(function() {
    store.dispatch(loadingData());
  },1000)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
