import axios from 'axios';
import types from './types';

export const createFollowAction = (id, followid) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/createFollow',
            headers: {
                id: id,
                followid: followid
            }
        }).then(response => {
            dispatch({
                type: types.CREATE_FOLLOW_USER,
                createdFollowID: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.CREATE_FOLLOW_USER_ERROR,
            error: 'Unable to follow user.'
        })
    }
};