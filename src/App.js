import React, {Component} from 'react';
import Landing from './components/landing';
import Menubar from './components/menubar';
import Header from './components/header';
import Signin from './components/logins/signin'
import Signup from './components/logins/signup';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Route token={localStorage.getItem('token')} component={Header} />
                    <Route path={"*"} component={Menubar} />
                    <Route exact path={"/"} component={Landing}/>
                    <Route path={"/signin"} component={Signin} />
                    <Route path={"/signup"} component={Signup} />
                </div>
            </Router>

        );
    }
}
export default App;

