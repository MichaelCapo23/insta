import axios from 'axios';
import types from './types';

export const getNotificationsAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: "/getNotifications",
            headers: {
                id: id,
            },
            data: {

            }
        }).then(response => {
            dispatch({
                type: types.GET_NOTIFICATIONS,
                notification_list: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.GET_NOTIFICATIONS_ERROR,
            error: 'unable to get notifications',
        })
    }
};