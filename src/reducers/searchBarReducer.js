import types from '../actions/types';

const DEFAULT_STATE = {
    searchBarResults: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SEARCH_BAR_RESULTS:
            return {...state, searchBarResults: action.searchBarResults};
        case types.SEARCH_BAR_RESULTS_ERROR:
            return {...state, error: action.error};
        default:
            return state
    }
}