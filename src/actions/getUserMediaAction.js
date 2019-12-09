import axios from 'axios';
import types from './types';

export const getUserMediaAction = (values) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getUserMedia',
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: types.GET_USER_MEDIA,
                media: response.data.media,
            })
        })
    } catch {
        dispatch({
            type: types.GET_USER_MEDIA_ERROR,
            error: 'Unable to get user media',
        })
    }
};