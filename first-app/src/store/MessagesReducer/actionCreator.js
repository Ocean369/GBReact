import { ADD_MESSAGE, CREATE_MESSAGES, DELETE_MESSAGES } from "../actionsConstant"


export function add_message(value) {
    return {
        type: ADD_MESSAGE,
        payload: value
    }
};

export function create_messages(value) {
    return {
        type: CREATE_MESSAGES,
        payload: value
    }
};

export function delete_messages(value) {
    return {
        type: DELETE_MESSAGES,
        payload: value
    }
};
