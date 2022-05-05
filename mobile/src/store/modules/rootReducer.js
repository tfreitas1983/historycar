import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import veiculo from './veiculos/reducer';

export default combineReducers({ auth, user, veiculo });