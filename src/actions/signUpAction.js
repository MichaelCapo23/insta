import axios from 'axios';
import types from './types';

export const signUpAction = values => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/addAccount',
            data: {
                name: values.name,
                username: values.username,
            },
            headers: {
                password: values.password,
                email: values.email,
                username: values.username,
                name: values.name,
            }
        }).then(response => {
            dispatch({
                type: types.SIGN_UP,
                token: response.data.token
            })
        })
    } catch {
        dispatch({
            type: types.SIGN_UP_ERROR,
            error: 'unable to add account'
        })
    }
};