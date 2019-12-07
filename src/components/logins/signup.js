import React, {Component, Fragment} from "react";
import {withRouter} from 'react-router-dom';
import {signUpAction} from '../../actions/signUpAction'
import {connect} from 'react-redux';
import SignUpReducer from "../../reducers/signInReducer";

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

    addAccount = () => {
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
            nameError: '',
            emailError: '',
            usernameError: '',
            passwordError: '',
            passwordConfirm: '',
        })
        this.addAccountAxios(); //send just the values needed
    };

    addAccountAxios = ()  => {
        this.props.signUpAction({name: this.state.name, password: this.state.password, email: this.state.email, username: this.state.username});
    };

    validate = () => {
        let errors = {};

        if(this.state.name.length < 5) {
            errors.nameError = 'Name Must Be 5 Characters Minimum';
        }

        // var patternRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}");
        // if(!patternRegex.test(this.state.password)) {
        if(this.state.password === '') {
            errors.passwordError = "Must Have At Least Eight Characters, One Capital Letter, And A Number";
        } else if(this.state.password !== this.state.passwordConfirm) {
            errors.passwordError = "Both Password Inputs Must Match.";
        }

        if(this.state.username.length < 5) {
            errors.usernameError = 'Username Must Be 5 Characters Minimum';
        }

        // var emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])\n");
        // if(!emailRegex.test(this.state.email)) {
        if(this.state.email === '') {
            errors.emailError = 'Invalid Email Address';
        }
        return errors;
    }


    render() {
        return (
            <Fragment>
                <div className={"content"}>
                    <div className="card card-styles-login card-rounded">
                        <div className={"content-container"}>
                            <div className={"help-block-errMessage"}>{this.state.errMessage}</div>
                            <h1 className={"center"}>Sign Up</h1>
                            <form className={"form-padding-signup"}>
                                <div className={"col-sm-12 col-md-12 col-lg-10 margin-auto form-group"}>
                                    <input onChange={e => this.addInputToState(e)} placeholder={"Enter Full Name"} id="name" type="text" className={"form-control signup-val"}/>
                                    <label htmlFor="name">Full Name</label>
                                    <span className="help-block">{this.state.nameError}</span>
                                </div>

                                <div className={"col-sm-12 col-md-12 col-lg-10 margin-auto form-group"}>
                                    <input onChange={e => this.addInputToState(e)} placeholder={"Enter Email"} id="email" type="text" className={"form-control signup-val"}/>
                                    <label htmlFor="name">Email</label>
                                    <span className="help-block">{this.state.emailError}</span>
                                </div>

                                <div className={"col-sm-12 col-md-12 col-lg-10 margin-auto form-group"}>
                                    <input onChange={e => this.addInputToState(e)} placeholder={"Enter Username"} id="username" type="text" className={"form-control signup-val"}/>
                                    <label htmlFor="name">Username</label>
                                    <span className="help-block">{this.state.usernameError}</span>
                                </div>

                                <div className={"col-sm-12 col-md-12 col-lg-10 margin-auto form-group"}>
                                    <input onChange={e => this.addInputToState(e)} placeholder={"Enter Password"} id="password" type="password" className={"form-control signup-val"}/>
                                    <label htmlFor="name">Password</label>
                                    <span className="help-block">{this.state.passwordError}</span>
                                </div>

                                <div className={"col-sm-12 col-md-12 col-lg-10 margin-auto form-group"}>
                                    <input onChange={e => this.addInputToState(e)} placeholder={"Confirm Password"} id="passwordConfirm" type="password" className={"form-control"}/>
                                    <label htmlFor="name">Password Confirm</label>
                                </div>
                            </form>
                            <div className="col-sm-12 col-md-12 col-lg-10 btn-container margin-auto center">
                                <button type={"button"} onClick={this.addAccount} className={"btn btn-info signup-btn"}>Create Account</button>
                            </div>
                            <div className="center">have an account? <span className={"has-account"}>Sign In</span></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.SignUpReducer.token
    }
}

export default connect(mapStateToProps, {signUpAction})(withRouter(Signup));