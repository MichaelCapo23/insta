import types from '../actions/types';

const DEFAULT_STATE = {
    savedID: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.SAVE_MEDIA:
            return {...state, savedID: action.savedID};
        case types.SAVE_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}