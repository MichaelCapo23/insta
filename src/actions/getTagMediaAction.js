import axios from 'axios';
import types from './types';

export const getTagMediaAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getTagMedia',
            headers: {
                id: id
            }
        }).then(response => {
            dispatch({
                type: types.GET_TAGGED_MEDIA,
                tagMediaList: response.data
            })
        })
    } catch {
        dispatch({
            type: types.GET_TAGGED_MEDIA_ERROR,
            error: 'Unable to get tagged media',
        })
    }
};