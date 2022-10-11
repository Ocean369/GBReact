import { ADD_MESSAGE, CREATE_MESSAGES, DELETE_MESSAGES } from "../actionsConstant"


export function add_message(id, message, delayMs = 0) {
    return {
        type: ADD_MESSAGE,
        payload: { id, message },
        meta: delayMs
    }
};

export function create_messages(id) {
    return {
        type: CREATE_MESSAGES,
        payload: id
    }
};

export function delete_messages(value) {
    return {
        type: DELETE_MESSAGES,
        payload: value
    }
};
