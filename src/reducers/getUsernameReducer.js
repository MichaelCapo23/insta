import types from '../actions/types';

const DEFAULT_STATE = {
    username: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_USERNAME:
            return {...state, username:action.username, name: action.username.name, id: action.username.id, profileFileName: action.username.profileFileName};
        case types.GET_USERNAME_ERROR:
            return {...state, error:action.error};
        default:
            return state;
    }
}