import types from '../actions/types';

const DEFAULT_STATE = {
    followerUsername: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_FOLLOWER_USERNAME:
            return {...state, followerUsername: action.followerUsername};
        case types.GET_FOLLOWER_USERNAME_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}