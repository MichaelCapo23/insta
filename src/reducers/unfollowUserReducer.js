import types from '../actions/types';

const DEFUALT_STATE = {
    unfollowID: '',
};

export default (state = DEFUALT_STATE, action) => {
    switch(action.type) {
        case types.UNFOLLOW_USER:
            return {...state, unfollowID: action.unfollowID};
        case types.UNFOLLOW_USER_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}