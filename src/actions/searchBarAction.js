import types from './types';
import axios from 'axios';


export const searchBarAction = (id, searchVal) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: '/searchBar',
            headers: {
                id: id,
                searchVal: searchVal
            }
        }).then(response => {
            dispatch({
                type: types.SEARCH_BAR_RESULTS,
                searchBarResults: response.data,
            })
        })
    } catch {
        dispatch({
            type: types.SEARCH_BAR_RESULTS_ERROR,
            error: 'Unable to get search results'
        })
    }
};