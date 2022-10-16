import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import { chatsReducer } from './ChatsReducer/ChatsRed';
import { messagesReducer } from './MessagesReducer/MessagesRed';
import { authentication } from './Authentication/reducer';
import { createLogger } from 'redux-logger'
import { ADD_MESSAGE } from './actionsConstant';
import { add_message } from './MessagesReducer/actionCreator';
import { addMessage, RobotSay } from '../function';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';



const logger = createLogger({
    collapsed: (getState, action) => action.type === ADD_MESSAGE,
    duration: true,
    timestamp: false
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//middleware
const addMessageWithMiddleware = store => next => action => {
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
    authentication: authentication,
});

const persistedReducer = persistReducer(config, rootReducer)

// window.__REDUX_DEVTOOLS_EXTENSION__ &&
// window.__REDUX_DEVTOOLS_EXTENSION__());

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            addMessageWithMiddleware,
            thunk,
            logger)
    )
);

// export const persistor = persistStore(store)


