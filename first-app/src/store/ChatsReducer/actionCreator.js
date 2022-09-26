import { ADD_CHAT, DELETE_CHAT } from "../actionsConstant";

export function add_chat(value) {
    return {
        type: ADD_CHAT,
        payload: value
    }
};

export function delete_chat(value) {
    return {
        type: DELETE_CHAT,
        payload: value
    }
}