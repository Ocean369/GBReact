import initialState from "../initialState";
import { ADD_MESSAGE, DELETE_MESSAGES, CREATE_MESSAGES } from '../actionsConstant';

export const messagesReducer = (state = initialState.messageList, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const obj = {}
            for (const chat in state) {
                obj[chat] = chat === action.payload.id ? [...state[chat], action.payload.message] : state[chat];
            }
            return obj

        }
        case CREATE_MESSAGES: {
            state[action.payload] = []
            return state
        }
        case DELETE_MESSAGES: {
            const obj = {}
            for (const chatID in state) {
                if (chatID !== action.payload) obj[chatID] = state[chatID];
            }
            return obj
        }
        default: return state
    }
}

