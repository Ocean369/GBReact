import initialState from "../initialState";
import { ADD_MESSAGE, DELETE_MESSAGES, CREATE_MESSAGES, CHANGE_MESSAGES } from '../actionsConstant';
import { db } from "../../services/firebase";

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
        case CHANGE_MESSAGES:
            return {
                ...state,
                [action.payload.chatId]: action.payload.messages
            }

        default: return state
    }
}

const getPayloadFromSnapshot = (snapshot) => {
    const messages = [];
    snapshot.forEach((mes) => {
        messages.push(mes.val());
    });
    return { chatId: snapshot.key, messages }
}

export const addMessageWithFirebase = (chatId, message) => async () => {
    db.ref("messages").child(chatId).child(message.id).set(message);
};

export const initMessageTracking = () => (dispatch) => {
    db.ref("messages").on("child_changed", (snapshot) => {
        const payload = getPayloadFromSnapshot(snapshot);
        dispatch({
            type: CHANGE_MESSAGES,
            payload,
        });
    });
    db.ref("messages").on("child_added", (snapshot) => {
        const payload = getPayloadFromSnapshot(snapshot);
        dispatch({
            type: CHANGE_MESSAGES,
            payload,
        });
    });
};

export const deleteMessageWithFirebase = (chatId, messageId) => async () => {
    db.ref("messages").child(chatId).child(messageId).remove();
};

