import axios from 'axios';
import types from './types';

export const getLandingAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getLandingMedia',
            headers: {
                id: id
            }
        }).then(response => {
            dispatch({
                type: types.GET_LANDING_MEDIA,
                landingMedia: response.data
            })
        })
    } catch {
        dispatch({
            type: types.GET_LANDING_MEDIA_ERROR,
            error: 'Unable to get user media'
        })
    }
};