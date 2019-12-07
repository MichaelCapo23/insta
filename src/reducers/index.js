import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import usernameReducer from './getUsernameReducer';
import signInReducer from './signInReducer';

const rootReducer = combineReducers({
    usernameReducer,
    signInReducer,
    form: formReducer,
});

export default rootReducer;