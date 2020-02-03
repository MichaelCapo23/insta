import axios from 'axios';
import types from './types'

export const addMediaAction = (file, desc) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/addMedia',
            headers: {
                file: file,
                desc: desc,
            }
        }).then(response => {
            dispatch({
                type: types.ADD_MEDIA,
                newMediaID: response.data
            })
        })
    } catch {
        dispatch({
            type: types.ADD_MEDIA_ERROR,
            error: 'Unable to add Media',
        })
    }
};