import {getPosition} from "../services";
import {error, getData, loading, updateState} from "../actions/actions";

const TOGGLE_LOADING = 'position/TOGGLE_LOADING';
const FETCH_POSITION_FAILURE = 'position/FETCH_POSITION_FAILURE';
const FETCH_POSITION_LIST = 'position/FETCH_POSITION_LIST';

const initialState = {
    loading: true,
    error: '',
    data: []
};

export const fetchPosition = (lat, lon) => (dispatch) => {
    getData(dispatch, TOGGLE_LOADING, FETCH_POSITION_FAILURE, FETCH_POSITION_LIST, getPosition, lat, lon)
        .then(res => res)
};

const positionReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return loading(state, action);
        case FETCH_POSITION_FAILURE:
            return error(state, action);
        case FETCH_POSITION_LIST:
            return updateState(state, action);
        default:
            return state;
    }
};

export default positionReducer;