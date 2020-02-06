import axios from 'axios';
import types from './types';

export const removeProfilePicAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/removeProfilePic',
            headers: {
                id: id,
            }
        }).then(response => {
            dispatch({
                type: types.REMOVE_PROFILE_PIC,
                removedProfileStatus: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.REMOVE_PROFILE_PIC_ERROR,
            error: 'unable to remove profile picture'
        })
    }
};