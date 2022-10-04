import initialState from "../initialState"
import * as type from '../actionsConstant'
import * as creator from './actionCreator'
import { auth } from '../../services/firebase'

export const authentication = (state = initialState.currentUser, action) => {
    switch (action.type) {
        case type.REGISTER_ERROR:
            return {
                ...state,
                error: action.payload

            }
        case type.REGISTER_SUCCESS: {
            console.log('REGISTER_SUCCESS ', action.payload);
            return {
                ...state,
                user: action.payload,
                error: ''
            }
        }
        case type.REGISTER_LOADING:
            return {
                ...state,
                loading: true
            }
        case type.LOGIN_LOADING:
            return {
                ...state,
                loading: true
            }
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case type.LOGIN_ERROR:
            {
                console.log('step3 => loginReducer error', action.payload);
                return {
                    ...state,
                    error: action.payload
                }
            }
        case type.LOGOUT_ERROR: {
            return {
                ...state,
                error: action.type,
                loading: false
            }
        }
        case type.LOGOUT_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case type.LOGOUT_SUCCESS: {
            return {
                ...state,
                loading: false,
                user: null,
                error: ''
            }
        }

        default: return state
    }

}

export const registerInitial = (displayName, email, phone, password) => {
    return (dispatch) => {
        dispatch(creator.registrStart());
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                console.log('user=> ', user);
                user.updateProfile({
                    displayName: displayName,
                    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg'
                    // phoneNumber: phone
                });
                console.log('user', user);
                dispatch(creator.registrSuccess(user));
            })
            .catch((e) => dispatch(creator.registrError(e)))

    }
}

export const loginInitiate = (email, password) => {
    return (dispatch) => {
        dispatch(creator.loginStart());
        auth
            .signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                console.log('use login success');
                dispatch(creator.loginSuccess(user));
            })
            .catch((e) => {
                console.log('step1 => loginInitiate => error', e);
                dispatch(creator.loginError(e))
            })
    }
}

export const logOutInitiate = () => {
    return (dispatch) => {
        dispatch(creator.logOutStart());
        auth
            .signOut()
            .then(() => dispatch(creator.logOutSuccess()))
            .catch(e => dispatch(creator.logOutError(e)))
    }
}