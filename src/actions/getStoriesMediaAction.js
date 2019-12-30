import axios from 'axios';
import types from './types';

export const getStoriesMediaAction = (id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: '/getStoriesMedia',
            headers: {
                id: id,
            }
        }).then(response => {
            dispatch({
                type: types.GET_STORIES_MEDIA,
                stories: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.GET_STORIES_MEDIA_ERROR,
            error: 'Unable to get stories',
        })
    }
};