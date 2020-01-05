import types from '../actions/types';

const DEFAULT_STATE = {
    suggestedList: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SUGGESTED_FOLLOWS:
            return {...state, suggestedList: action.suggestedList};
        case types.SUGGESTED_FOLLOWS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}