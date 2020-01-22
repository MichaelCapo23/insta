import types from '../actions/types';

const DEFAULT_STATE = {
    updatedPasswordRows: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.UPDATE_PASSWORD:
            return {...state, updatedPassword: action.updatedPasswordRows};
        case types.UPDATE_PASSWORD_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}