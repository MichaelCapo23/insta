import types from '../actions/types';

const DEFAULT_STATE = {
    stats: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.STATS:
            return {...state, stats: action.stats};
        case types.STATS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}