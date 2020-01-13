import axios from 'axios';
import types from './types';

export const createNotificationAction = (values) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/createNotification',
            headers: {
                id: values.userid,
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