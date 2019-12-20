import axios from 'axios';
import types from './types'

export const createCommentAction = (values) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: '/createComment',
            headers: {
                token: localStorage.getItem('token'),
            },
            data: {
                comment: values.comment,
                postID: values.postID,
            }
        }).then(response => {
            dispatch({
                type: types.CREATE_COMMENT,
                commentID: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.CREATE_COMMENT_ERROR,
            error: 'Unable to create comment',
        })
    }
};