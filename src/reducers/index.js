import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import usernameReducer from './getUsernameReducer';
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';
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
import singlePostInfoReducer from './singlePostInfoReducer';
import getNotificationsReducer from './getNotificationsReducer';
import createNotificationReducer from './createNotificationReducer';
import getFollowerUsernameReducer from './getFollowerUsernameReducer';
import getSettingsUserDataReducer from './getSettingsUserDataReducer';
import updateSettingsReducer from './updateSettingsReducer';
import updatePasswordReducer from './updatePasswordReducer';
import createFollowReducer from './createFollowReducer';
import saveMediaReducer from './saveMediaReducer';
import searchBarReducer from './searchBarReducer';
import getSavedMediaReducer from './getSavedMediaReducer';

const rootReducer = combineReducers({
    usernameReducer,
    signInReducer,
    signUpReducer,
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
    singlePostInfoReducer,
    getNotificationsReducer,
    createNotificationReducer,
    getFollowerUsernameReducer,
    getSettingsUserDataReducer,
    updateSettingsReducer,
    updatePasswordReducer,
    createFollowReducer,
    saveMediaReducer,
    searchBarReducer,
    getSavedMediaReducer,
    form: formReducer,
});

export default rootReducer;