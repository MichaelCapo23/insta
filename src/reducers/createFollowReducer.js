import types from '../actions/types';

const DEFAULT_STATE = {
    createdFollowID: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.CREATE_FOLLOW_USER:
            return {...state, createdFollowID: action.createdFollowID};
        case types.CREATE_FOLLOW_USER_ERROR:
            return {...state, error: action.error};
        default:
            return state
    }
}