import initialState from "../initialState";
import { ADD_CHAT, DELETE_CHAT } from '../actionsConstant'

export const chatsReducer = (state = initialState.chatList, action) => {
    switch (action.type) {

        case ADD_CHAT: {
            return [...state, action.payload]
        }
        case DELETE_CHAT: {
            return state.filter((chat) => chat.id !== action.payload)

        }
        default: return state
    }
}
