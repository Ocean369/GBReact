import initialState from "../initialState";
import { ADD_MESSAGE, DELETE_MESSAGES, CREATE_MESSAGES } from '../actionsConstant';

export const messagesReducer = (state = initialState.messageList, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return state.map((messages) => messages.id === action.payload.id ? { id: messages.id, messages: [...messages.messages, action.payload.message] } : messages)
        }
        case CREATE_MESSAGES: {
            return [...state, { id: action.payload, messages: [] }]
        }
        case DELETE_MESSAGES: {
            return state.filter((chat) => chat.id !== action.id)
        }
        default: return state
    }
}

