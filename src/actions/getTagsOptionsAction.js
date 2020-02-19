import axios from 'axios';
import types from './types';

export const getTagsOptionsAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getTagsOptions',
            headers: {
                id: id,
            }
        }).then(response => {
            dispatch({
                type: types.GET_TAGS_OPTIONS,
                tagsOptionsList: response.data
            })
        })
    } catch {
        dispatch({
            type: types.GET_TAGS_OPTIONS_ERROR,
            error: 'Unable to get tag options list',
        })
    }
};