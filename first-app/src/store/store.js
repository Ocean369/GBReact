import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import { chatsReducer } from './ChatsReducer/ChatsRed';
import { messagesReducer } from './MessagesReducer/MessagesRed';
import { profileReducer } from './profile/profileReducer';
import { createLogger } from 'redux-logger'
import { ADD_CHAT, ADD_MESSAGE } from './actionsConstant';
import { add_message } from './MessagesReducer/actionCreator';
import { addMessage, RobotSay } from '../function';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const logger = createLogger({
    collapsed: (getState, action) => action.type === ADD_MESSAGE,
    duration: true,
    timestamp: false,
    diff: true
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const middleware = store => next => action => {
    let delayMs = action?.meta;
    if (action.type === ADD_MESSAGE && action.payload.message.isOwner) {

        const timeoutID = setTimeout(() => {
            let chat = store.getState().chats.find(chat => chat.id === action.payload.id);
            let newMess = addMessage(store.getState().messages, RobotSay(), chat.name, chat);
            store.dispatch(add_message(chat.id, newMess));
            clearTimeout(timeoutID);
        }, delayMs);
    }
    return next(action)

}

const config = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    chats: chatsReducer,
    messages: messagesReducer,
    user: profileReducer
});

const persistedReducer = persistReducer(config, rootReducer)

// window.__REDUX_DEVTOOLS_EXTENSION__ &&
// window.__REDUX_DEVTOOLS_EXTENSION__());

export const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(middleware, logger)
    )
);

export const persistor = persistStore(store)


