import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {signInAction} from '../../actions/signInAction';
import error from "../../assets/error.png";
import AuthHOC from '../../HOC/authHOC';
import appStore from '../../assets/appDownload.png'

class Signin extends Component {

    state = {
        email: '',
        emailErr: 'true',
        password: '',
        passwordErr: 'true',
    };

    addToState = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () => this.signinValidation())
    };

    signinValidation = () => {
        let errObj = this.validate();
        if(Object.entries(errObj).length !== 0) {
            for (let [key, value] of Object.entries(errObj)) {
                this.setState({
                    [key]: value
                }, () => { this.signinBtn.current.setAttribute('disabled', 'disabled')})
            }
            return false;
        }

        this.setState({
            emailErr: 'false',
            passwordErr: 'false'
        }, () => {this.signinBtn.current.removeAttribute('disabled')})
    };

    validate = () => {
        let errors = {};
        if(this.state.email === '') {
            errors.emailErr = 'true';
        }

        if(this.state.password === '') {
            errors.passwordErr = 'true';
        }

        return errors;
    };

    loginUser = () => {
        this.props.signInAction({email: this.state.email, password: this.state.password});
    };

    componentDidUpdate() {
        if(this.props.token !== '' && this.props.token) {
            localStorage.setItem('token', this.props.token);
            this.props.history.push('/');
        }
    }

    render() {
        this.signinBtn = React.createRef();
        return (
            <div className={"content"}>
                <div className="signup-content">
                    <div className="content-gutter-signin">
                        <div className="card-container">
                            <div className="card-gutter-signin">
                                <div className={'insta-pic-signin'}/>
                                <form className={"form"}>
                                    <div className={"signin-val-container"}>
                                        <input autoComplete="off" onChange={e => this.addToState(e)} placeholder={"Email"} id="email" type="text" className={"signup-val"}/>
                                        {this.state.emailError ? <img className="error-signup" src={error} alt="instagram error"/> : ''}
                                    </div>
                                    <div className={"signin-val-container-last"}>
                                        <input autoComplete="off" onChange={e => this.addToState(e)} placeholder={"Password"} id="password" type="password" className={"signup-val"}/>
                                        {this.state.passwordError ? <img className="error-signup" src={error} alt="instagram error"/> : ''}
                                    </div>
                                    <button onClick={this.loginUser} ref={this.signinBtn} type={"button"} className={"facebook-login-btn-login signin-btn"}>Log in</button>
                                </form>
                                <div className="divider-container">
                                    <div className="divider-one"/>
                                    <div className="or-text">OR</div>
                                    <div className="divider-two"/>
                                </div>
                                <button type={"button"} className={"facebook-login-btn"}><div className={"facebook-logo"}/>Log in with Facebook</button>
                                <div className="forgot-password">Forgot password?</div>
                            </div>
                        </div>
                        <div className="have-an-account-container">
                            <div className="link-signup">Don't have an account? <Link to={"/signUp"}>Sign up</Link></div>
                        </div>
                        <div className="get-app">Get the app.</div>
                        <div className="get-app-link-container">
                            <a href={"https://apps.apple.com/app/instagram/id389801252?vt=lo"} className="app-store"/>
                            <a href={"https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3D90B8B580-B1E9-401D-822F-E4A384735510%26utm_content%3Dlo%26utm_medium%3Dbadge"} className="google-play"/>
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
                        <span className={'signup-copyright'}>© 2020 INSTAGRAM FROM MICHAEL</span>
                    </div>
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.signInReducer.token
    }
}

export default connect(mapStateToProps, {signInAction})(withRouter(AuthHOC(Signin)));