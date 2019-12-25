import axios from 'axios';
import types from './types';

export const unfollowUserAction = (values) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: '/unfollowUser',
            headers: {
                id: values.id,
                unfollowid: values.unfollowID,
            }
        }).then(response => {
            dispatch({
                type: types.UNFOLLOW_USER,
                unfollowID: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.UNFOLLOW_USER_ERROR,
            error: 'Unable to unfollow user',
        })
    }
}