import produce from 'immer';

const INITIAL_STATE = {
    id: null,
    kmaquisicao: null,
    situacao: null,
    veiculoId: null,
    clienteId: null,
};

export default function veiculo(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@veiculo/PEGAVEICULO': {
                draft.kmaquisicao = action.payload.kmaquisicao;
                draft.veiculoId = action.payload.veiculoId;
                draft.id = action.payload.id,
                draft.situacao = action.payload.situacao;
                draft.clienteId = action.clienteId;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.signed = false;
                draft.accessToken = null;
                draft.tipo = null;
                draft.situacao = null;
                draft.id = null;
                break;
            }
            default:
                return state;
        }
    });
}