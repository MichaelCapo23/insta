import React, {Component} from 'react';
import Landing from './components/landing';
import Header from './components/header';
import Signin from './components/logins/signin'
import Signup from './components/logins/signup';
import Profile from './components/profile';
import Stories from './components/stories'
import Explore from './components/explore';
import Settings from './components/settings'
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path={"*"} component={Header}/>
                    <Route exact path={"/"} component={Landing}/>
                    <Route path={"/profile"} component={Profile} />
                    <Route path={"/signin"} component={Signin} />
                    <Route path={"/signup"} component={Signup} />
                    <Route path={'/stories'} component={Stories}/>
                    <Route path={'/explore'} component={Explore}/>
                    <Route path={'/settings'} component={Settings}/>
                </div>
            </Router>

        );
    }
}
export default App;

