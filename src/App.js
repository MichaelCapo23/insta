import React, {Component} from 'react';
import Landing from './components/landing';
import Header from './components/header';
import Signin from './components/logins/signin'
import Signup from './components/logins/signup';
import Profile from './components/profile';
import Stories from './components/stories'
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    {/*<Route path={"*"} component={Header}/>*/}
                    <Route exact path={"/"} component={Landing}/>
                    <Route path={"/profile"} component={Profile} />
                    <Route path={"/signin"} component={Signin} />
                    <Route path={"/signup"} component={Signup} />
                    <Route path={'/stories'} component={Stories}></Route>
                </div>
            </Router>

        );
    }
}
export default App;

