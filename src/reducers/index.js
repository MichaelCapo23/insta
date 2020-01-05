import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import usernameReducer from './getUsernameReducer';
import signInReducer from './signInReducer';
import getUserStatsReducer from './getUserStatsReducer';
import getUserMediaReducer from './getUserMediaReducer';
import getLandingMediaReducer from './getLandingMediaReducer';
import createCommentReducer from './createCommentReducer';
import likeMediaReducer from './likeMediaReducer';
import unfollowUserReducer from './unfollowUserReducer';
import getStoriesProfileReducer from './getStoriesProfileReducer';
import getStoriesMediaReducer from './getStoriesMediaReducer';
import updateViewedStoriesReducer from './updateViewedStoriesReducer';
import suggestedFollowsReducer from './suggestedFollowsReducer';
import exploreMediaReducer from './exploreMediaReducer'

const rootReducer = combineReducers({
    usernameReducer,
    signInReducer,
    getUserStatsReducer,
    getUserMediaReducer,
    getLandingMediaReducer,
    createCommentReducer,
    likeMediaReducer,
    unfollowUserReducer,
    getStoriesProfileReducer,
    getStoriesMediaReducer,
    updateViewedStoriesReducer,
    suggestedFollowsReducer,
    exploreMediaReducer,
    form: formReducer,
});

export default rootReducer;