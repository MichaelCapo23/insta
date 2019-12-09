import axios from 'axios';
import types from './types';

export const getUsernameAction = () => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getUsername',
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: types.GET_USERNAME,
                username: response.data.username
            })
        })
    } catch {
        dispatch({
            type: types.GET_USERNAME_ERROR,
            error: 'Unable to get username'
        })
    }
};