import { combineReducers, legacy_createStore as createStore } from 'redux'
import { chatsReducer } from './ChatsReducer/ChatsRed';
import { messagesReducer } from './MessagesReducer/MessagesRed';
import { profileReducer } from './profile/profileReducer';

const store = createStore(
    combineReducers({
        chats: chatsReducer,
        messages: messagesReducer,
        user: profileReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

export default store
