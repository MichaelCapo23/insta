import axios from 'axios';
import types from './types';

export const unfollowUserAction = (values) => async dispatch => {
    try {
        axios({
            mthod: 'POST',
            url: '/unfollowUser',
            headers: {
                id: values.userID,
                unfollowID: values.posterID
            }
        }).then(response => {
            dispatch({
                type: types.UNFOLLOW_USER,
                unfollowID: response.validateAssertion,
            })
        })
    } catch {
        dispatch({
            type: types.UNFOLLOW_USER_ERROR,
            error: 'Unable to unfollow user',
        })
    }
}