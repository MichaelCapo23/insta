import types from '../actions/types';


const DEFAULT_STATE = {
    savedMedia: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_SAVED_MEDIA:
            return {...state, savedMedia: action.savedMedia};
        case types.SAVE_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}