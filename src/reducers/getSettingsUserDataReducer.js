import types from '../actions/types';

const DEFAULT_STATE = {
    settingsInfo: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_SETTINGS_DATA:
            return {...state, settingsInfo: action.settingsInfo};
        case types.GET_SETTINGS_DATA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}