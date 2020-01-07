import types from '../actions/types';

const DEFAULT_STATE = {
    singlePostInfo: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SINGLE_POST:
            return {...state, singlePostInfo: action.singlePostInfo};
        case types.SINGLE_POST_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}