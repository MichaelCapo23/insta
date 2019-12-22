import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsernameAction} from '../actions/getUsernameAction'

export default (WrappedComponent, to ='./signIn', redirect = false) => {
    class Auth extends Component {

        componentDidMount() {
            this.checkAuth();
        }

        componentDidUpdate() {
            this.checkAuth();
        }

        importAll = (r) => {
            debugger
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        }

        checkAuth = () => {
            let token = localStorage.getItem('token');
            if(!token) {
                //if user is already on a page where auth isnt required dont do anything, otherwise push them to '/signIn'
                if(this.props.history.location.pathname !== '/signUp' && this.props.history.location.pathname !== '/signIn') {
                    this.props.history.push(to);
                }
            } else {
                //if user is already on a page where auth is required dont do anything, otherwise push them to '/'
                if(this.props.history.location.pathname === '/signUp' || this.props.history.location.pathname === '/signIn') {
                    this.props.history.push('/');
                }

                //check if username props is set, if not get it, needed on all auth files.
                if(!this.props.username || this.props.username === '') {
                    this.props.getUsernameAction();
                }

                debugger;
                if(!this.props.mediaImages || this.props.mediaImages === '') {
                    //CHANGE THE FILE PATH TO THE IMAGES AS ITS DIFFFRENENT IN THE HOC THAN THE COMPONENT
                    const mediaImages = this.importAll(require.context('../../assets/media', false, /\.(png|jpe?g|PNG)$/));
                    const profileImages = this.importAll(require.context('../../assets/profilePics', false, /\.(png|jpe?g|PNG)$/));
                    const generalImages = this.importAll(require.context('../../assets/', false, /\.(png|jpe?g|PNG)$/));
                    Auth.setProps({
                        mediaImages: mediaImages,
                        profileImages: profileImages,
                        generalImages: generalImages,
                    })
                }
            }
        };

        render() {
            return <WrappedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return {
            username: state.usernameReducer.username.username,
            name: state.usernameReducer.username.name,
        }

    }

    return connect(mapStateToProps,{
        getUsernameAction
    })(Auth);
}
