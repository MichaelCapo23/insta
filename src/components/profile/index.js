import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUsernameAction} from "../../actions/getUsernameAction";
import 'material-icons'

class Profile extends Component {

    state = {
        data: null,
        username: '',
        numberPosts: 0,
        numberFollower: 0,
        numberFollowing: 0,
        activeTab: 'posts'
    };

    changeTabs = (e) => {
        let id = e.target.attributes.id.value;
        this.setState({
            activeTab: id
        })
    };

    componentDidMount() {
        //check for the token, if not set then push the user to the signin page, make this a higher order component in the future
        let token = localStorage.getItem('token');
        if(!token) {
            this.props.history.push('/signin');
        }
        //get the username
        this.props.getUsernameAction();
    }

    componentDidUpdate() {
        //if new usernaem is given then set the state with new username
        if (this.state.username !== this.props.username) {
            this.setState({
                username: this.props.username
            })
        }
    }

    render() {
        return (
            <Fragment>
                <div className={"content-header"}>
                    <div className="profile-gutter">
                        <div className="user-info-container">
                            <div className="profile-pic-container">
                                <div className="profile-pic-container-inner"></div>
                            </div>
                            <div className="profile-info-container">
                                <div className="profile-info-content-container">
                                    <div className="information-container-top">
                                        <div className="profile-username">{this.state.username}</div>
                                        <div className="profile-edit">
                                            <button className={'btn-edit'} type={'button'}>Edit Profile</button>
                                            <div className={'cog-icon'}></div>
                                        </div>
                                    </div>
                                    <div className="information-container-middle">
                                        <div className="posts">{this.state.numberPosts} posts</div>
                                        <div className="followers">{this.state.numberFollower} followers</div>
                                        <div className="following">{this.state.numberFollowing} following</div>
                                    </div>
                                    <div className="information-container-bottom">
                                        <div className="first-last-name">Michael Capobianco</div>
                                        <div className="bio">subscribe for more content!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-body-tabs">
                            <ul className="nav nav-tabs tabs-center profile-nav-tabs" data-toggle="tabs">
                                <li className={this.state.activeTab === 'posts' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} ref={this.posts} id="posts" className={"nav-tabs-font"} href="#POSTS">POSTS</a></li>
                                <li className={this.state.activeTab === 'igtv' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="igtv" className={"nav-tabs-font"} href="#IGTV">IGTV</a></li>
                                <li className={this.state.activeTab === 'saved' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="saved" className={"nav-tabs-font"} href="#SAVED">SAVED</a></li>
                                <li className={this.state.activeTab === 'tagged' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="tagged" className={"nav-tabs-font"} href="#TAGGED">TAGGED</a></li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <div className={this.state.activeTab === 'posts' ? 'active tab-pane' :"tab-pane"} id="POSTS">this stab need a service to get all the media posted from this user, send it to a componet to be put into a container and the css when hovered to show likes and comment counts</div>
                            <div className={this.state.activeTab === 'igtv' ? 'active tab-pane' :"tab-pane"} id="IGTV">IGTV</div>
                            <div className={this.state.activeTab === 'saved' ? 'active tab-pane' :"tab-pane"} id="SAVED">SAVED</div>
                            <div className={this.state.activeTab === 'tagged' ? 'active tab-pane' :"tab-pane"} id="TAGGED">TAGGED</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.usernameReducer.username
    }
}

export default connect(mapStateToProps, {getUsernameAction})(withRouter(Profile));