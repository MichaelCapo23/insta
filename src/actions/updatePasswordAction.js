import axios from 'axios';
import types from './types'

export const updatePasswordAction = (password, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: '/updatePassword',
            headers: {
                password: password,
                id: id,
            }
        }).then(response => {
            dispatch({
                type: types.UPDATE_PASSWORD,
                updatedPasswordRows: response.data.updatedPasswordRows,
            })
        })
    } catch {
        dispatch({
            type: types.UPDATE_PASSWORD_ERROR,
            error: 'Unable to update settings',
        })
    }
};