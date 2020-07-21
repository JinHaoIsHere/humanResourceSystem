import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider, } from 'react-redux';
import userReducer from './store/reducers/user';
import layoutReducer from './store/reducers/layout';
import thunk from 'redux-thunk';
import axios from 'axios';

import {restoreUser} from './store/actions/users';

//set default headers.
axios.interceptors.request.use(request => {
  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(currentUserStr);
  if (currentUser && currentUser.token) {
    request.headers.common['Authorization'] = 'Bearer ' + currentUser.token;
  }
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
})

const reducer = combineReducers({
  user: userReducer,
  layout: layoutReducer
});
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));
// const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(restoreUser());

//React 在 strict mode 下会刻意执行两次渲染，以防止组件内有什么 side effect 引起 bug，提前预防。
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,


  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
