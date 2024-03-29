import axios from 'axios';
import types from './types';

export const singlePostInfoAction = (postid, id) => async dispatch => {
      try {
          axios({
              method: "POST",
              url: '/singlePostInfo',
              headers: {
                  postid: Number(postid),
                  id: id
              }
          }).then(response => {
              dispatch({
                  type: types.SINGLE_POST,
                  singlePostInfo: response.data,
             })
          })
      } catch {
          dispatch({
              type: types.SINGLE_POST_ERROR,
              error: 'Unable to get post information',
          })
      }
};