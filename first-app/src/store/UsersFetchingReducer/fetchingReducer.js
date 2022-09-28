import { GET_USERS, GET_USERS_LOADING, GET_USERS_ERROR } from "../actionsConstant";
import initialState from "../initialState";

export const fetchingReducer = (state = initialState.fetching, action) => {
    switch (action.type) {
        case GET_USERS: {
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: ''
            }
        }
        case GET_USERS_LOADING: {
            return {
                ...state,
                loading: true,
                error: ''

            }
        }
        case GET_USERS_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        }
        default: return state
    }
}