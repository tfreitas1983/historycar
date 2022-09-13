import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import * as AuthActions from './actions';

export function* signIn({ payload }) {        
    try {
        const { email, password } = payload;
        const response = yield call(api.post, 'signin', { email, password });              
        const { accessToken, tipo, situacao, id } = response.data;    
        const {fail} = false;
        api.defaults.headers.Authorization = `Barear ${accessToken}`;

        yield put(AuthActions.signInSucess(accessToken, email, tipo, situacao, id, fail)); 
    } catch (error) {
        
        yield put(AuthActions.signFailure()); 
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, 'users', {
            name,
            email,
            password,
            provider: true,
        });

        //history.push('/');
        //toast.success('Account created with sucess');
    } catch (error) {
       // toast.error('Please check your informations and try again.');
        yield put(AuthActions.signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { accessToken } = payload.auth;

    api.defaults.headers.Authorization = `Barear ${accessToken}`;
}

export function signOut() {
  //  history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);