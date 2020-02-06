import types from '../actions/types';

const DEFAULT_STATE = {
    removedProfileStatus: '',
};


export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.REMOVE_PROFILE_PIC:
            return {...state, removedProfileStatus: action.removedProfileStatus};
        case types.REMOVE_PROFILE_PIC_ERROR:
            return {...state, error: action.error};
        default:
            return state
    }
}