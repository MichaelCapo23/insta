import axios from 'axios';
import types from './types';

export const saveMediaAction = (id, mediaid) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/saveMedia',
            headers: {
                id: id,
                mediaid: mediaid
            }
        }).then(response => {
            dispatch({
                type: types.SAVE_MEDIA,
                savedID: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.SAVE_MEDIA_ERROR,
            error: 'Unable to save media',
        })
    }
};