import axios from 'axios';
import types from './types'

export const updateSettingsAction = (values, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: '/updateSettings',
            headers: {
                valuesarr: JSON.stringify(values),
                id: id,
            }
        }).then(response => {
            dispatch({
                type: types.UPDATE_SETTINGS,
                updatedSettingsRows: response.data.updatedSettingsRows,
            })
        })
    } catch {
        dispatch({
            type: types.UPDATE_SETTINGS_ERROR,
            error: 'Unable to update settings',
        })
    }
}