import { GET_USERS, GET_USERS_LOADING, GET_USERS_ERROR } from "../actionsConstant";

export const getData_thunk = () => {
    return async (dispatch) => {
        dispatch(get_data_loading());
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            dispatch(get_data(data));
        } catch (error) {
            console.log(error);
            dispatch(get_data_error(error.toString()));
        }
    }
}

function get_data(data) {
    return {
        type: GET_USERS,
        payload: data
    }
};

function get_data_loading() {
    return {
        type: GET_USERS_LOADING
    }
}

function get_data_error(error) {
    return {
        type: GET_USERS_ERROR,
        payload: error
    }
}