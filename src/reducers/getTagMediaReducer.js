import types from '../actions/types';

const DEFAULT_STATE = {
    tagsOptionsList: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_TAGS_OPTIONS:
            return {...state, tagsOptionsList: action.tagsOptionsList};
        case types.GET_TAGS_OPTIONS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}




