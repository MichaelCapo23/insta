import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {signInAction} from '../../actions/signInAction';

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
        let token = localStorage.getItem('token');
        if(token || this.props.token) {
            this.props.history.push('/');
        }
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
                <div className="card card-styles-signin card-rounded">
                    <div className={"content-container"}>
                        <h1 className={"center"}>Sign In</h1>
                        <div className={"help-block-errMessage"}>{this.state.errMessage}</div>
                        <form className={"form-padding"}>
                            <div className={"col-sm-8 margin-auto form-group"}>
                                <input onChange={this.addToState} placeholder={"Enter Email"} id="email" type="text" className={"form-control"}/>
                                <label htmlFor="name">Email</label>
                                <span className="help-block">{this.state.emailErr}</span>
                            </div>

                            <div className={"col-sm-8 margin-auto form-group"}>
                                <input onChange={this.addToState} placeholder={"Enter Password"} id="password" type="password" className={"form-control"}/>
                                <label htmlFor="name">Password</label>
                                <span className="help-block">{this.state.passwordErr}</span>
                                <div className={"forgot-pass"}>Forgot Password?</div>
                            </div>
                        </form>
                        <div className="col-sm-8 btn-container margin-auto no-padding center">
                            <button onClick={this.signinValidation} type={"button"} className={"btn btn-info login-btn center"}>Login</button>
                        </div>
                        <div className={"create-account center"}>Dont have an account? <span className={"sign-up-now"}>Sign up now!</span></div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.signInReducer.token
    }
}

export default connect(mapStateToProps, {signInAction})(withRouter(Signin));