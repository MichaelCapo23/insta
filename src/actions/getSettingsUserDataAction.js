import axios from 'axios';
import types from './types';

export const getSettingsUserDataAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getSettingsInfo',
            headers: {
                id: id
            }
        }).then(response => {
            dispatch({
                type: types.GET_SETTINGS_DATA,
                settingsInfo: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.GET_SETTINGS_DATA_ERROR,
            error: 'Unable to get settings user data',
        })
    }
}