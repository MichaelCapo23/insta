import types from '../actions/types';

const DEFAULT_STATE = {
    storiesMedia: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_STORIES_MEDIA:
            return {...state, storiesMedia: action.stories};
        case types.GET_STORIES_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}