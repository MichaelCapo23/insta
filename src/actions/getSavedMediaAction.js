import axios from 'axios';
import types from './types';

export const getSavedMediaAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getSavedMedia',
            headers: {
                id: id
            }
        }).then(response => {
            dispatch({
                type: types.GET_SAVED_MEDIA,
                savedMedia: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.GET_SAVED_MEDIA_ERROR,
            error: 'Unable to get saved media',
        })
    }
};