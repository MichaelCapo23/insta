import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './materialadmin.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux';
//need to do
import rootReducer from './reducers';
import middleware from './middleware/middleware'

const store = createStore(rootReducer, {}, applyMiddleware(middleware));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
