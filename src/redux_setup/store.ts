import { combineReducers } from "@reduxjs/toolkit";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import globalSagas from "redux_setup/global-sagas";

import userDataReducer from "modules/userType/userData.slice";
import imageReducer from "modules/image/image.slice";
import { ReduxStoreRootTypes } from "types/types";

const history = createBrowserHistory();

const sagaMiddleWare = createSagaMiddleware();

const middlewares = [routerMiddleware(history), sagaMiddleWare];

const combinedReducers = combineReducers<ReduxStoreRootTypes>({
  userData: userDataReducer,
  image: imageReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleWare.run(globalSagas);
