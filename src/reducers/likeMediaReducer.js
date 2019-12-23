import types from '../actions/types';

const DEFAULT_STATE = {
    likedID: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.LIKE_MEDIA:
            return {...state, likedID: action.likedID};
        case types.LIKE_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}