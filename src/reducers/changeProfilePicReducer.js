import types from '../actions/types';

const DEFAULT_STATE = {
    changeMediaID: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.CHANGE_PROFILE_PIC:
            return {...state, changeMediaID: action.changeMediaID};
        case types.CHANGE_PROFILE_PIC_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}