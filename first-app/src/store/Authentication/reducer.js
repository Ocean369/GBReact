import initialState from "../initialState"
import * as type from '../actionsConstant'
import * as creator from './actionCreator'
import { auth } from '../../services/firebase'
import { usersSelector } from "../UsersFetchingReducer/selectors"
import { getAuth, updatePhoneNumber, RecaptchaVerifier, PhoneAuthProvider, } from "firebase/auth";


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

export function registerInitial(displayName, email, phone, password) {
    return (dispatch) => {
        dispatch(creator.registrStart());
        auth
            .createUserWithEmailAndPassword(email, password)
            // .currentUser.updatePhoneNumber()
            .then(({ user }) => {
                user.updateProfile({
                    displayName: displayName,
                    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg'
                });
                dispatch(creator.registrSuccess(user));
            })
            .catch((e) => dispatch(creator.registrError(e)))

        // 
        //     const applicationVerifier = new types.RecaptchaVerifier('recaptcha-container');
        //     const provider = new types.PhoneAuthProvider(auth);
        //     const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
        //     const phoneCredential = types.PhoneAuthProvider.credential(verificationId, verificationCode);
        //     updatePhoneNumber(auth.currentUser, phoneCredential)
        //         .then(({ user }) => dispatch(creator.registrSuccess(user)))
        //         .catch((e) => console.log(e))
        // 
        // Obtain the verificationCode from the user.



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