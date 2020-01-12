import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUsernameAction} from '../actions/getUsernameAction';
import {getNotificationsAction} from '../actions/getNotificationsAction'

export default (WrappedComponent, to ='./signIn', redirect = false) => {
    class Auth extends Component {

        state = {
            mediaImages: null,
        };

        componentWillMount () {
            this.checkAuth();
        }

        componentDidUpdate() {
            this.checkAuth();
        }

        importAll = (r) => {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        };

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
                    this.props.getUsernameAction({userID: this.props.id});
                    this.props.getNotificationsAction({userID: this.props.id});
                }

                if((!this.props.mediaImages || this.props.mediaImages === '') && !this.state.mediaImages) {
                    const mediaImages = this.importAll(require.context('../assets/media', false, /\.(png|jpe?g|PNG|JPG|MOV|MP4|AVI)$/));
                    const profileImages = this.importAll(require.context('../assets/profilePics', false, /\.(png|jpe?g|PNG|JPG|MOV|MP4|AVI)$/));
                    const generalImages = this.importAll(require.context('../assets/', false, /\.(png|jpe?g|PNG|JPG|MOV|MP4|AVI)$/));
                    this.setState({
                        mediaImages: mediaImages,
                        profileImages: profileImages,
                        generalImages: generalImages,
                    })
                }
            }
        };

        render() {
            return <WrappedComponent mediaImages={this.state.mediaImages} profileImages={this.state.profileImages} generalImages={this.state.generalImages} {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return {
            username: state.usernameReducer.username.username,
            name: state.usernameReducer.username.name,
            id: state.usernameReducer.username.id,
            notification_list: state.getNotificationsReducer.getNotificationsAction,
        }

    }

    return connect(mapStateToProps,{
        getUsernameAction,
        getNotificationsAction,
    })(withRouter(Auth));
}
