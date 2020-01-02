import types from '../actions/types';

const DEFAULT_STATE = {
    viewedIDs: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.VIEWED_STORIES:
            return {...state, viewedIDs: action.viewedIDs};
        case types.VIEWED_STORIES_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}