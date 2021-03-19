import {getWeather} from "../services";
import {error, getData, loading, updateState} from "../actions/actions"

const TOGGLE_LOADING = 'weather/TOGGLE_LOADING';
const FETCH_WEATHER_FAILURE = 'weather/FETCH_WEATHER_FAILURE';
const FETCH_WEATHER_LIST = 'weather/FETCH_WEATHER_LIST';

const initialState = {
    loading: true,
    error: '',
    data: [],
};

export const fetchWeather = (lat, lon) => (dispatch) => {
    getData(dispatch, TOGGLE_LOADING, FETCH_WEATHER_FAILURE, FETCH_WEATHER_LIST, getWeather, lat, lon)
        .then(res => res);
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return loading(state, action);
        case FETCH_WEATHER_FAILURE:
            return error(state, action);
        case FETCH_WEATHER_LIST:
            return updateState(state, action);
        default:
            return state;
    }
};

export default weatherReducer;