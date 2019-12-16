import types from '../actions/types';

const DEFAULT_STATE = {
  landingMedia: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_LANDING_MEDIA:
            return {...state, landingMedia: action.landingMedia};
        case types.GET_LANDING_MEDIA_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}