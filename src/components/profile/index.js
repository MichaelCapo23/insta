import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserStatsAction} from '../../actions/userStatsAction';
import {getUserMediaAction} from "../../actions/getUserMediaAction";
import UserMediaList from './userMediaList';
import authHOC from "../../HOC/authHOC";


class Profile extends Component {

    // constructor(props) {
    //     super(props);
    //     const img
    // }

    state = {
        data: null,
        username: '',
        numberPosts: '0',
        numberFollower: '0',
        numberFollowing: '0',
        madeMedia: '0',
        media: '',
        waiting: false,
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
        //get users stats
        this.props.getUserStatsAction();
        //get user media
        if(this.props.id) {
            this.props.getUserMediaAction(this.props.id);
        }
    }

    componentDidUpdate() {
        //if new stats are given then set the state
        if(this.props.stats) {
            let {posts, followers, following} = this.props.stats;
            let {numberPosts, numberFollower, numberFollowing} = this.state;
            if(numberPosts !== posts || numberFollower !== followers || numberFollowing !== following) {
                this.setState({
                    numberPosts : posts,
                    numberFollower: followers,
                    numberFollowing: following,
                })
            }
        }

        //get the profile media once component updates with this.props.id
        if(this.props.id && this.props.media === '' && !this.state.waiting) {
            this.props.getUserMediaAction(this.props.id);
            this.setState({
                waiting: true,
            })
        }

        //if this.props.media is set and it is different from the current state then set the new state and call this.separatePropsInState
        if(this.props.media !== '' && this.props.media !== this.state.media) {
            this.setState({
                media: this.props.media,
            }, () => {this.separatePropsInState()})
        }
    }

    separatePropsInState = () => {
        if(this.state.media && this.state.media !== '') {
            let postArr = this.props.media.filter(item => {
                return item.mediaType === 'post';
            });

            let profileArr = this.props.media.filter(item => {
                return item.mediaType === 'profile';
            });

            if(this.props.media && this.state.madeMedia === '0') {
                this.setState({
                    madeMedia: '1',
                    postMedia: postArr,
                    profileMedia: profileArr[0].fileName,
                })
            }
        }
    }

    makeMedia = (media) => {
        let profileMediaList = this.state.postMedia.map((media, index) => {
            return (
                <UserMediaList key={index} media={media}/>
            )
        });

        return profileMediaList;
    };

    render() {
        let profileMediaList = '';
        if(this.state.postMedia) {
            profileMediaList = this.makeMedia(this.state.postMedia);
        }

        return (
            <Fragment>
                <div className={"content-header"}>
                    <div className="profile-gutter">
                        <div className="user-info-container">
                            <div className="profile-pic-container">
                                <div className="profile-pic-container-inner">
                                    <img className="profilePic" src={this.state.profileMedia ? this.props.profileImages[this.state.profileMedia] : ''} alt=""/>
                                </div>
                            </div>
                            <div className="profile-info-container">
                                <div className="profile-info-content-container">
                                    <div className="information-container-top">
                                        <div className="profile-username">{this.props.username}</div>
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
                            <div className={this.state.activeTab === 'posts' ? 'active tab-pane' :"tab-pane"} id="POSTS">{profileMediaList !== '' ? profileMediaList : <div className="center">You have no posted any media!</div>}</div>
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
        stats: state.getUserStatsReducer.stats,
        media: state.getUserMediaReducer.media
    }
}

export default connect(mapStateToProps, {
    getUserStatsAction, getUserMediaAction,
})(withRouter(authHOC(Profile)));