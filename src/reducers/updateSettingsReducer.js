import types from '../actions/types';

const DEFAULT_STATE = {
    updatedSettingsRows: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.UPDATE_SETTINGS:
            return {...state, updatedSettingsRows: action.updatedSettingsRows};
        case types.UPDATE_SETTINGS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}