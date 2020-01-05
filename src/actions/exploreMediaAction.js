import axios from 'axios';
import types from './types';

export const exploreMediaAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/exploreMedia',
            headers: {
                id: id
            }
        }).then(response => {
            dispatch({
                type: types.EXPLORE_MEDIA,
                exploreMediaList: response.data
            })
        })
    } catch {
        dispatch({
            type: types.EXPLORE_MEDIA_ERROR,
            error: 'Unable to get explore media',
        })
    }
};