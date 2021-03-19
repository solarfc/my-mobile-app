import reducer from "./reducers";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;