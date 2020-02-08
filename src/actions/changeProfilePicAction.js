import axios from 'axios';
import types from './types';

export const changeProfilePicAction = (file, id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/changeProfilePic',
            headers: {
                id: id,
            },
            data: {
                file: file,
            }
        }).then(response => {
            dispatch({
                type: types.CHANGE_PROFILE_PIC,
                changeMediaID: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.CHANGE_PROFILE_PIC_ERROR,
            error: 'Unable to change profile picture',
        })
    }
};











    // CHANGE_PROFILE_PIC_ERROR