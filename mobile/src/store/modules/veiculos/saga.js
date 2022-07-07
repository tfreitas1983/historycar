import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/config';
import * as AuthActions from './actions';

export function* pegaVeiculo({ payload }) {
    try {
        const idbusca = payload;
        
        const response = yield call(api.get, 'veiculosclientes'+idbusca);

        const { kmaquisicao, clienteId, situacao,id, veiculoId } = response.data;
        console.log('data', response.data)
        //api.defaults.headers.Authorization = `Barear ${id}`;
        yield put(AuthActions.pegaVeiculos(id, kmaquisicao, clienteId, veiculoId, situacao));
       
       // history.push('/dashboard');
    } catch (error) {
        Alert.alert('Erro no veículo', 'Veículo não encontrado' )        
        yield put(AuthActions.signFailure());
    }
}

export default all([
    //takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@veiculo/PEGAVEICULO', pegaVeiculo)
]);