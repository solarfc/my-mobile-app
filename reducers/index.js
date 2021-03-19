import {combineReducers} from "redux";
import weatherReducer from "./weatcher-reducer";
import positionReducer from "./position-reducer";

const reducer = combineReducers({
    weather: weatherReducer,
    position: positionReducer
});

export default reducer;