import produce from 'immer';

const INITIAL_STATE = {
    accessToken: null,
    tipo: null,
    situacao: null,
    id: null,
    signed: false,
    loading: false,
    fail: false,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST': {
                draft.loading = true;
                fail: false;
                break;
            }
            case '@auth/SIGN_IN_SUCESS': {
                draft.accessToken = action.payload.accessToken;
                draft.tipo = action.payload.tipo;
                draft.id = action.payload.id;
                draft.situacao = action.payload.situacao;
                draft.signed = true;
                draft.loading = false;
                draft.fail = false;
                break;
            }
            case '@auth/SIGN_FAILURE': {
                draft.loading = false;
                draft.signed = false;
                draft.fail = true;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.signed = false;
                draft.accessToken = null;
                draft.tipo = null;
                draft.situacao = null;
                draft.id = null;
                draft.loading = false;
                draft.fail = false;
                break;
            }
            default:
                return state;
        }
    });
}