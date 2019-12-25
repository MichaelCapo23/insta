import types from '../actions/types';

const DEFAULT_STATE = {
    stories: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_STORIES:
            return {...state, stories: action.stories};
        case types.GET_STORIES_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}