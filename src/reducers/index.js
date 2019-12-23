import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import usernameReducer from './getUsernameReducer';
import signInReducer from './signInReducer';
import getUserStatsReducer from './getUserStatsReducer';
import getUserMediaReducer from './getUserMediaReducer';
import getLandingMediaReducer from './getLandingMediaReducer';
import createCommentReducer from './createCommentReducer';
import likeMediaReducer from './likeMediaReducer';

const rootReducer = combineReducers({
    usernameReducer,
    signInReducer,
    getUserStatsReducer,
    getUserMediaReducer,
    getLandingMediaReducer,
    createCommentReducer,
    likeMediaReducer,
    form: formReducer,
});

export default rootReducer;