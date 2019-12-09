import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import usernameReducer from './getUsernameReducer';
import signInReducer from './signInReducer';
import getUserStatsReducer from './getUserStatsReducer';
import getUserMediaReducer from './getUserMediaReducer';

const rootReducer = combineReducers({
    usernameReducer,
    signInReducer,
    getUserStatsReducer,
    getUserMediaReducer,
    form: formReducer,
});

export default rootReducer;