import initialState from "./initialState";
import { addMessageList } from "./messages/selectors";
import { createChatList, getIdChat } from './chats/selectors';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addMessage': {
            return {
                ...state,
                messageList: addMessageList(state.messageList, action.message, action.user, action.chat)
            }
        }
        case 'deleteChatMessages': {
            return {
                ...state,
                messageList: state.messageList.filter((chat) => chat.id !== action.id)
            }
        }
        case 'addChat': {
            let id = getIdChat(action.newChat, state.chatList);
            return {
                ...state,
                chatList: createChatList(action.newChat, state.chatList, id),
                messageList: [...state.messageList, { id: id, messages: [] }]
            }
        }
        case 'deleteChat': {
            return {
                ...state,
                chatList: state.chatList.filter((chat) => chat.id !== action.id)
            }
        }
        default: return state
    }
}

export default reducer