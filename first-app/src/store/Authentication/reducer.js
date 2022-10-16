import initialState from "../initialState"
import * as type from '../actionsConstant'
import * as creator from './actionCreator'
import { auth } from '../../services/firebase'
// import { usersSelector } from "../UsersFetchingReducer/selectors"
// import { getAuth, updatePhoneNumber, RecaptchaVerifier, PhoneAuthProvider, } from "firebase/auth";
import { db } from "../../services/firebase";




export const authentication = (state = initialState.currentUser, action) => {
    switch (action.type) {
        case type.REGISTER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false

            }
        case type.REGISTER_SUCCESS: {
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: ''
            }
        }
        case type.REGISTER_LOADING:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case type.LOGIN_LOADING:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                error: '',
                loading: false,
                user: action.payload,
            }
        case type.LOGIN_ERROR:
            {
                console.log('step3 => loginReducer error', action.payload);
                return {
                    ...state,
                    error: action.payload,
                    loading: false
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
                loading: true,
                error: ''
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

        case type.CLEAN_ERROR:
            return {
                ...state,
                error: ''
            }

        default: return state
    }

}

export function writeUserData(userId, name, email, imageUrl, phone) {
    db.ref('users').child(userId).set({
        username: name,
        email: email,
        phone: phone,
        profile_picture: imageUrl
    })
        .then(() => { console.log('Data writing success') })
        .catch(err => { console.error(err) })
}

export function getUserData(userId) {
    const dbRef = db.ref('users');
    console.log('entrance getUserData');
    dbRef.child(userId).get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log('getUserData =>', snapshot.val());
                return { ...snapshot.val() }
            } else {
                console.log("No data available");
                return {}
            }
        })
        .catch((error) => {
            if (error) {
                console.error(error);
                return {}
            }
        });
}

export function registerInitial(displayName, email, phone, password, photoURL) {
    return (dispatch) => {
        dispatch(creator.registrStart());
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                user.updateProfile({
                    displayName: displayName,
                    photoURL: photoURL
                });
                writeUserData(user.uid,
                    displayName,
                    email,
                    photoURL,
                    phone);
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
                dispatch(creator.loginSuccess(user));
            })
            .catch((e) => {
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