import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    SignUpReducer,
    form: formReducer,
});

export default rootReducer;