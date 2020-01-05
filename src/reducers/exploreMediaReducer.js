import types from '../actions/types';

const DEFAULT_STATE = {
    exploreMediaList: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.EXPLORE_MEDIA:
            return {...state, exploreMediaList: action.exploreMediaList};
        case types.EXPLORE_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}