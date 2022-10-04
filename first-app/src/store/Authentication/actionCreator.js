import * as type from '../actionsConstant'


export function registrStart() {
    return {
        type: type.REGISTER_LOADING
    }
};

export function registrSuccess(user) {
    return {
        type: type.REGISTER_SUCCESS,
        payload: user
    }
}

export function registrError(error) {
    return {
        type: type.REGISTER_ERROR,
        payload: error.toString()
    }
}

export const loginStart = () => {
    return {
        type: type.LOGIN_LOADING
    }
};

export const loginSuccess = (user) => {
    return {
        type: type.LOGIN_SUCCESS,
        payload: user
    }
};

export function logOutStart() {
    return {
        type: type.LOGOUT_LOADING
    }
};

export function logOutSuccess() {
    return {
        type: type.LOGOUT_SUCCESS,
    }
}

export function logOutError(error) {
    return {
        type: type.LOGOUT_ERROR,
        payload: error.toString()
    }
}

export const loginError = (error) => {
    console.log('step 2 => actioncreator error=', error.toString())
    return {
        type: type.LOGIN_ERROR,
        payload: error.toString()
    }
};