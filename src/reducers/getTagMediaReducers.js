import types from '../actions/types';

const DEFAULT_STATE = {
    tagMediaList: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_TAGGED_MEDIA:
            return {...state, tagMediaList: action.tagMediaList};
        case types.GET_TAGGED_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}