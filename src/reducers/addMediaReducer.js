import types from '../actions/types';

const DEFAULT_STATE = {
    newMediaID: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.ADD_MEDIA:
            return {...state, newMediaID: action.newMediaID};
        case types.ADD_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state
    }
}