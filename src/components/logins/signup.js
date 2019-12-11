import React, {Component} from "react";
import {withRouter, Link} from 'react-router-dom';
import {signUpAction} from '../../actions/signUpAction'
import {connect} from 'react-redux';
import error from '../../assets/error.png'
class Signup extends Component {

    state = {
        name : '',
        nameError: '',
        email : '',
        emailError: '',
        username: '',
        usernameError: '',
        password:'',
        passwordError: '',
        passwordConfirm: '',
        errMessage: '',
    };

    addInputToState = (e) => {
        this.setState({
            [e.target.id] : e.target.value,
        });
    };

    clearState = () => {
        this.setState({
            nameError: '',
            emailError: '',
            usernameError: '',
            passwordError: '',
            passwordConfirm: '',
        });
    };

    addAccount = () => {
        this.clearState();
        let errObj = this.validate();
        if(Object.entries(errObj).length !== 0) {
            for (let [key, value] of Object.entries(errObj)) {
                this.setState({
                    [key]: value
                })
            }
            return false;
        }
        this.clearState();
        this.addAccountAxios(); //send just the values needed
    };

    addAccountAxios = ()  => {
        this.props.signUpAction({name: this.state.name, password: this.state.password, email: this.state.email, username: this.state.username});
    };

    validate = () => {
        let errors = {};

        if(this.state.name.length < 5) {
            errors.nameError = true;
        }

        // var patternRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}");
        // if(!patternRegex.test(this.state.password)) {
        if(this.state.password === '') {
            errors.passwordError = true;
        }

        if(this.state.username.length < 5) {
            errors.usernameError = true;
        }

        // var emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])\n");
        // if(!emailRegex.test(this.state.email)) {
        if(this.state.email === '') {
            errors.emailError = true;
        }
        return errors;
    };


    render() {
        return (
            <div className={"content"}>
                <div className="signup-content">
                    <div className="content-gutter">
                        <div className="card-container">
                            <div className="card-gutter">
                                <div className={'insta-pic'}/>
                                <div className="desc-signup">Sign up to see photos and videos from your friends.</div>
                                <button type={"button"} className={"facebook-login-btn"}><div className={"facebook-logo"}/>Log in with Facebook</button>
                                <div className="divider-container">
                                    <div className="divider-one"/>
                                    <div className="or-text">OR</div>
                                    <div className="divider-two"/>
                                </div>
                                <form className={"form"}>
                                    <div className={"signup-val-container"}>
                                        <input onChange={e => this.addInputToState(e)} placeholder={"Email"} id="email" type="text" className={"signup-val"}/>
                                        {this.state.emailError ? <img className="error-signup" src={error} alt="instagram error"/> : ''}
                                    </div>
                                    <div className={"signup-val-container"}>
                                        <input onChange={e => this.addInputToState(e)} placeholder={"Full Name"} id="name" type="text" className={"signup-val"}/>
                                        {this.state.nameError ? <img className="error-signup" src={error} alt="instagram error"/> : ''}
                                    </div>
                                    <div className={"signup-val-container"}>
                                        <input onChange={e => this.addInputToState(e)} placeholder={"Username"} id="username" type="text" className={"signup-val"}/>
                                        {this.state.usernameError ? <img className="error-signup" src={error} alt="instagram error"/> : ''}
                                    </div>

                                    <div className={"signup-val-container-last"}>
                                        <input onChange={e => this.addInputToState(e)} placeholder={"Password"} id="password" type="password" className={"signup-val"}/>
                                        {this.state.passwordError ? <img className="error-signup" src={error} alt="instagram error"/> : ''}
                                    </div>
                                    <button  onClick={this.addAccount} type={"button"} className={"facebook-login-btn signup-btn"}>Sign up</button>
                                    <div className={"privacy-text"}>By signing up, you agree to our Terms , Data Policy and Cookies Policy.</div>
                                </form>
                            </div>
                        </div>
                        <div className="have-an-account-container">
                            <div className="link-signin">Have an account? <Link to={"signin"}>Log in</Link></div>
                        </div>
                    </div>
                </div>
                <footer className={"signup-footer-container"}>
                    <div className="signup-link-container">
                        <ul className={'signup-link-ul'}>
                            <li className={"signup-link"}>ABOUT US</li>
                            <li className={"signup-link"}>SUPPORT</li>
                            <li className={"signup-link"}>PRESS</li>
                            <li className={"signup-link"}>API</li>
                            <li className={"signup-link"}>JOBS</li>
                            <li className={"signup-link"}>PRIVACY</li>
                            <li className={"signup-link"}>TERMS</li>
                            <li className={"signup-link"}>DIRECTOR</li>
                            <li className={"signup-link"}>PROFILES</li>
                            <li className={"signup-link"}>HASHTAGS</li>
                            <li className={"signup-link"}>LANGUAGE</li>
                        </ul>
                        <span className={'signup-copyright'}>© 2019 INSTAGRAM FROM MICHAEL</span>
                    </div>
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // token: state.SignUpReducer.token
    }
}

export default connect(mapStateToProps, {signUpAction})(withRouter(Signup));