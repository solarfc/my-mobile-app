const toggleLoading = (type, loading) => {
    return {
        type: type,
        payload: loading
    }
};

const fetchError = (type, error) => {
    return {
        type: type,
        payload: error
    }
};

const fetchData = (type, data) => {
    return {
        type: type,
        payload: data
    }
};

export const getData = async (dispatch, loading_type, error_type, data_type, method, lat, lon) => {
    dispatch(toggleLoading(loading_type, true));
    let data = await method(lat, lon);
    if(data.status === 200) {
        dispatch(fetchData(data_type, data.data));
        setTimeout(() => {
            dispatch(toggleLoading(loading_type, false));
        }, 1000);
    } else {
        dispatch(fetchError(error_type, data.message));
    }
}

export const loading = (state, action) => {
    return {...state, loading: action.payload};
};

export const error = (state, action) => {
    return {...state, error: action.payload};
};

export const updateState = (state, action) => {
    return {...state, data: action.payload};
};