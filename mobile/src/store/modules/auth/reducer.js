import produce from 'immer';

const INITIAL_STATE = {
    accessToken: null,
    tipo: null,
    signed: false,
    loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST': {
                draft.loading = true;
                break;
            }
            case '@auth/SIGN_IN_SUCESS': {
                draft.accessToken = action.payload.accessToken;
                draft.tipo = action.payload.tipo;
                draft.signed = true;
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_FAILURE': {
                draft.loading = false;
                draft.signed = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.signed = false;
                draft.accessToken = null;
                draft.tipo = null;
                draft.id = null;
                break;
            }
            default:
                return state;
        }
    });
}