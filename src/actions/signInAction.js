import axios from 'axios';
import types from './types';

export const signInAction = (values) => async dispatch =>{
    try {
        debugger;
        axios({
            method: 'POST',
            url: '/loginUser',
            headers: {
                email: values.email,
                password: values.password
            }
        }).then(response => {
            dispatch({
                type: types.SIGN_IN,
                token: response.data.token
            })
        })
    } catch {
        dispatch({
            type: types.SIGN_IN_ERROR,
            error: 'Unable to log user in',
        })
    }
}