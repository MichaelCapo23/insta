import axios from 'axios';
import types from './types';

export const getUserMediaAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getUserMedia',
            headers: {
                id: id
            }
        }).then(response => {
            dispatch({
                type: types.GET_USER_MEDIA,
                media: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.GET_USER_MEDIA_ERROR,
            error: 'Unable to get user media',
        })
    }
};