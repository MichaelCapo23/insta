import axios from 'axios';
import types from './types';

export const getFollowerUsernameAction = (username) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: "/getFollowerUsername",
            headers: {
                username: username
            }
        }).then(response => {
            dispatch({
                type: types.GET_FOLLOWER_USERNAME,
                followerUsername: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.GET_FOLLOWER_USERNAME_ERROR,
            error: 'unable to get follower username',
        })
    }
};