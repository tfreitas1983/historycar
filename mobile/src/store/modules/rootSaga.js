import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import veiculo from './veiculos/reducer';

export default function* rootSaga() {
    return yield all([auth, user, veiculo]);
}