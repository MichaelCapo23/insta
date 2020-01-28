import axios from 'axios';
import types from './types';

export const createNotificationAction = (id, posterID, type, mediaID) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/createNotification',
            headers: {
                fromid: id,
                toid : posterID,
                type : type,
                mediaid : mediaID
            }
        }).then(response => {
            dispatch({
                type: types.CREATE_NOTIFICATIONS_ERROR,
                notificationID: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.CREATE_NOTIFICATIONS_ERROR,
            error: 'unable to add notification',
        })
    }
};