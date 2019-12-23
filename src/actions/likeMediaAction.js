import types from './types';
import axios from 'axios';

export const likeMediaAction = (values) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: '/likeMedia',
            headers: {
                id: values.userID
            },
            data: {
                mediaID : values.mediaID,
            }
        }).then(response => {
            dispatch({
                type: types.LIKE_MEDIA,
                likedID: response.data
            })

        })
    } catch {
        dispatch({
            type: types.LIKE_MEDIA_ERROR,
            error: 'Unable to like media',
        })
    }
};