import axios from 'axios';
import types from './types';

export const getUsernameAction = (username) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getUsername',
            headers: {
                username: username,
                token: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: types.GET_USERNAME,
                username: response.data
            })
        })
    } catch {
        dispatch({
            type: types.GET_USERNAME_ERROR,
            error: 'Unable to get username'
        })
    }
};