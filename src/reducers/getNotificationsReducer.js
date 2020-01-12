import types from '../actions/types';

const DEFAULT_STATE = {
    notification_list: '',
};


export default (state = DEFAULT_STATE, action) => {
    switch (action.types) {
        case types.GET_NOTIFICATIONS:
            return {...state, notification_list: action.notification_list};
        case types.GET_NOTIFICATIONS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}