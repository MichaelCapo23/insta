import types from '../actions/types';

const DEFAULT_STATE = {
    commentID: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.CREATE_COMMENT:
            return {...state, commentID: action.commentID};
        case types.CREATE_COMMENT_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}