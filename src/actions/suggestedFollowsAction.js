import axios from 'axios';
import types from './types';

export const suggestedFollowsAction = (id) => async dispatch => {
      try {
          axios({
              method: "POST",
              url: '/suggestedFollows',
              headers: {
                    id: id
              }
          }).then(response => {
              dispatch({
                  type: types.SUGGESTED_FOLLOWS,
                  suggestedList: response.data.suggestedList
              })
          })

      } catch {
          dispatch({
              type: types.SUGGESTED_FOLLOWS_ERROR,
              error: 'Unable to get suggested followers',
          })
      }
};