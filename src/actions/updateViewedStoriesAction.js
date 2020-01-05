import types from './types';
import axios from 'axios';

export const updateViewedStoriesAction = (values) => async dispatch => {
    console.log(JSON.stringify(values.storyIDs));
    try {
        axios({
            method: 'POST',
            url: '/updateViewedStories',
            headers: {
                id: values.userID,
                storyIDs: JSON.stringify(values.storyIDs),
            }
        }).then(response => {
            dispatch({
                type: types.VIEWED_STORIES,
                viewedIDs: response.data
            })
        })
    } catch {
        dispatch({
            type: types.VIEWED_STORIES_ERROR,
            viewedIDs: 'Unable to update stories'
        })
    }
};