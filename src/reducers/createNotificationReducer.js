import types from '../actions/types';

const DEFAULT_STATE = {
    notificationID: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.CREATE_NOTIFICATIONS:
            return {...state, notificationID: action.notificationID};
        case types.CREATE_NOTIFICATIONS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}