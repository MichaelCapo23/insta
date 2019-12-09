import types from '../actions/types';

const DEFAULT_STATE = {
    media: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_USER_MEDIA:
            return {...state, media: action.media};
        case types.GET_USER_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}