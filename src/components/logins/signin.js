import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {signInAction} from '../../actions/signInAction';
import error from "../../assets/error.png";
import appStore from '../../assets/appDownload.png'

class Signin extends Component {

    state = {
        email: '',
        emailErr: '',
        password: '',
        passwordErr: '',
        errMessage: ''
    };

    addToState = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    componentDidMount() {
        // let token = localStorage.getItem('token');
        // if(token || this.props.token) {
        //     this.props.history.push('/');
        // }
    }

    signinValidation = () => {
        let errObj = this.validate();
        if(Object.entries(errObj).length !== 0) {
            for (let [key, value] of Object.entries(errObj)) {
                this.setState({
                    [key]: value
                })
            }
            return false;
        }

        this.setState({
            emailErr: '',
            passwordErr: ''
        });
        this.loginUser(); //send just the values needed
    };

    validate = () => {
        let errors = {};
        if(this.state.email === '') {
            errors.emailErr = 'Email is required';
        }

        if(this.state.email === '') {
            errors.passwordErr = 'Password is required';
        }

        return errors;
    };

    loginUser = () => {
        this.props.signInAction({email: this.state.email, password: this.state.password});
    };

    componentDidUpdate() {
        let token = localStorage.getItem('token');
        if(token || this.props.token) {
            this.props.history.push('/');
        }
    }


    render() {
        return (
            <div className={"content"}>
                <div className="signup-content">
                    <div className="content-gutter-signin">
                        <div className="card-container">
                            <div className="card-gutter-signin">
                                <div className={'insta-pic-signin'}/>
                                <form className={"form"}>
                                    <div className={"signin-val-container"}>
                                        <input autoComplete="off" onChange={e => this.addInputToState(e)} placeholder={"Email"} id="email" type="text" className={"signup-val"}/>
                                        {this.state.emailError ? <img className="error-signup" src={error} alt="instagram error"/> : ''}
                                    </div>
                                    <div className={"signin-val-container-last"}>
                                        <input autoComplete="off" onChange={e => this.addInputToState(e)} placeholder={"Password"} id="password" type="password" className={"signup-val"}/>
                                        {this.state.passwordError ? <img className="error-signup" src={error} alt="instagram error"/> : ''}
                                    </div>
                                    <button  onClick={this.addAccount} type={"button"} className={"facebook-login-btn-login signin-btn"}>Log in</button>
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
                            <div className="link-signup">Don't have an account? <Link to={"signup"}>Sign up</Link></div>
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
                        <span className={'signup-copyright'}>© 2019 INSTAGRAM FROM MICHAEL</span>
                    </div>
                </footer>
            </div>
        )
    }
}

//<div className="card card-styles-signin card-rounded">
//                     <div className={"content-container"}>
//                         <h1 className={"center"}>Sign In</h1>
//                         <div className={"help-block-errMessage"}>{this.state.errMessage}</div>
//                         <form className={"form-padding"}>
//                             <div className={"col-sm-8 margin-auto form-group"}>
//                                 <input onChange={this.addToState} placeholder={"Enter Email"} id="email" type="text" className={"form-control"}/>
//                                 <label htmlFor="name">Email</label>
//                                 <span className="help-block">{this.state.emailErr}</span>
//                             </div>
//
//                             <div className={"col-sm-8 margin-auto form-group"}>
//                                 <input onChange={this.addToState} placeholder={"Enter Password"} id="password" type="password" className={"form-control"}/>
//                                 <label htmlFor="name">Password</label>
//                                 <span className="help-block">{this.state.passwordErr}</span>
//                                 <div className={"forgot-pass"}>Forgot Password?</div>
//                             </div>
//                         </form>
//                         <div className="col-sm-8 btn-container margin-auto no-padding center">
//                             <button onClick={this.signinValidation} type={"button"} className={"btn btn-info login-btn center"}>Login</button>
//                         </div>
//                         <div className={"create-account center"}>Dont have an account? <span className={"sign-up-now"}>Sign up now!</span></div>
//                     </div>
//                 </div>

function mapStateToProps(state) {
    return {
        token: state.signInReducer.token
    }
}

export default connect(mapStateToProps, {signInAction})(withRouter(Signin));