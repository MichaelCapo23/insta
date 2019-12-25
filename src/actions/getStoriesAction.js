import axios from 'axios';
import types from './types';

export const getStoriesAction = (id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: '/getStories',
            headers: {
                id: id,
            }
        }).then(response => {
            dispatch({
                type: types.GET_STORIES,
                stories: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.GET_STORIES_ERROR,
            error: 'Unable to get stories',
        })
    }
};