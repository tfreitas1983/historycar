export function signInRequest(email, password) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: { email, password },
    };
}

export function signInSucess(accessToken, email, tipo, situacao, id, fail) {
    return {
        type: '@auth/SIGN_IN_SUCESS',
        payload: { accessToken, email, tipo, situacao, id, fail },
    };
}

export function signUpRequest(email, password) {
    return {
        type: '@auth/SIGN_UP_REQUEST',
        payload: { email, password },
    };
}

export function signFailure() {
    return {
        type: '@auth/SIGN_FAILURE'
        
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}