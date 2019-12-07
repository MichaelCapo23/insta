import types from '../actions/types';

const DEFAULT_STATE = {
    token: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SIGN_UP:
            return {...state, token: action.token};
        case types.SIGN_UP_ERROR:
            return {...state, error: action.error};
        default:
            return state
    }
}