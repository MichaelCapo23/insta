import axios from 'axios';
import types from './types'

export const addMediaAction = (file, desc, id, tags) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/addMedia',
            headers: {
                desc: desc,
                id: id,
            },
            data: {
                file: file,
                tags: JSON.stringify(tags),
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