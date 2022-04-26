import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '../../../services/api';

import * as UserActions from './actions';

export function* updateProfile({ payload }) {
    try {
        const { id, email, ...rest } = payload.data;

        // eslint-disable-next-line prefer-object-spread
        const profile = Object.assign(
            {
                id,
                email                
            },
            rest.oldPassword ? rest : {}
        );

        const response = yield call(api.put, 'users', profile);

        
        
    } catch (error) {
        
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);