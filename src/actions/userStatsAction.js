import axios from 'axios';
import types from './types';

export const getUserStatsAction = (id) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/getUserStats',
            headers: {
                id: id
            }
        }).then(response => {
            dispatch({
                type: types.STATS,
                stats: response.data
            })
        })
    } catch {
        dispatch({
            type: types.STATS_ERROR,
            error: 'unable to get user stats'
        })
    }
}