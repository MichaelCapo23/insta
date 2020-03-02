import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserStatsAction} from '../../actions/userStatsAction';
import {getUserMediaAction} from "../../actions/getUserMediaAction";
import UserMediaList from './userMediaList';
import ProfileOptionsModal from './profileOptionsModal';
import CreatePostModal from './createPostModal';
import authHOC from "../../HOC/authHOC";
import PostModal from '../postModal'
import {singlePostInfoAction} from "../../actions/singlePostInfoAction";
import {getFollowerUsernameAction} from "../../actions/getFollowerUsernameAction";
import {getUsernameAction} from "../../actions/getUsernameAction";
import {getSavedMediaAction} from '../../actions/getSavedMediaAction'
import {addMediaAction} from '../../actions/addMediaAction';
import ProfilePicModal from './profilePicModal';
import {removeProfilePicAction} from '../../actions/removeProfilePicAction';
import ChangeProfileModal from './changeProfileModal';
import {changeProfilePicAction} from '../../actions/changeProfilePicAction';
import {getTagMediaAction} from '../../actions/getTagMediaAction';
import {getTagsOptionsAction} from "../../actions/getTagsOptionsAction";
import {createNotificationAction} from '../../actions/createNotificationAction';
import {createFollowAction} from '../../actions/createFollowAction';


class Profile extends Component {

    state = {
        data: null,
        username: '',
        numberPosts: '0',
        numberFollower: '0',
        numberFollowing: '0',
        madeMedia: '0',
        media: '',
        waiting: false,
        waiting2: false,
        activeTab: 'posts',
        followerUsernameID: '',
    };

    changeTabs = (e) => {
        let id = e.target.attributes.id.value;
        this.setState({
            activeTab: id
        })
    };

    componentDidMount() {
        this.setState({
            profileTracker: window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1),
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) !== this.state.profileTracker) {
                this.setState({
                    waiting: false,
                })
            }

            //get the profile media once component updates with this.props.id
            if (this.props.id && !this.state.waiting) {
                if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) !== 'profile') {
                    this.props.getUsernameAction(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1));
                } else {
                    this.props.getUserStatsAction(this.props.id);
                    this.props.getUserMediaAction(this.props.id);
                    this.props.getUsernameAction();
                    this.props.getSavedMediaAction(this.props.id);
                    this.props.getTagMediaAction(this.props.id);
                    this.props.getTagsOptionsAction(this.props.id);
                }
                this.setState({
                    waiting: true,
                    waiting2: false,
                    profileTracker: window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1),
                })
            }

            if ((this.props.followerUsernameID && this.props.followerUsernameID !== '') && this.props.followerUsernameID != this.state.followerUsernameID && (!this.state.waiting2 || window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) !== this.state.profileTracker)) {
                this.setState({
                    profileTracker: window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1),
                    waiting2: true,
                    followerUsernameID: this.props.followerUsernameID,
                });
                this.props.getUserStatsAction(this.props.followerUsernameID);
                this.props.getUserMediaAction(this.props.followerUsernameID);
                this.props.getTagMediaAction(this.props.followerUsernameID);
            }

            //if this.props.media is set and it is different from the current state then set the new state and call this.separatePropsInState
            if (this.props.media !== '' && this.props.media !== this.state.media && this.props.id) {
                this.setState({
                    media: this.props.media,
                }, () => {
                    this.separatePropsInState()
                })
            }

            if (this.props.stats) {
                let {posts, followers, following} = this.props.stats;
                let {numberPosts, numberFollower, numberFollowing} = this.state;
                if (numberPosts !== posts || numberFollower !== followers || numberFollowing !== following) {
                    this.setState({
                        numberPosts: posts,
                        numberFollower: followers,
                        numberFollowing: following,
                    })
                }
            }
            if((this.props.newMediaID && this.props.newMediaID) && this.props.newMediaID != this.state.newMediaID) {
                this.setState({
                    newMediaID: this.props.newMediaID
                }, () => {this.props.getUserMediaAction(this.props.id);});
            }
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

            if(this.props.media) {
                this.setState({
                    postMedia: postArr,
                    profileMedia: profileArr[0] ? profileArr[0].fileName : '',
                })
            }
        } else {
            this.setState({
                postMedia: '',
                profileMedia: '',
            })
        }
    };

    openProfileOptionsModal = () => {
        document.getElementsByClassName('profileOptionsModal')[0].classList.remove("hide");
    };

    makeMedia = (media) => {
        let profileMediaList = this.state.postMedia.map((media, index) => {
            return (
                <UserMediaList postFns={this.openPostModal} mediaImages={this.props.mediaImages} key={index} media={media}/>
            )
        });

        return profileMediaList;
    };

    toSettings = () => {
        this.props.history.push('/settings');
    };

    openPostModal = (postid) => {
        this.props.singlePostInfoAction(postid, this.props.id);
        document.getElementById("postModal").classList.remove("hide");
    };

    makeSavedMedia = () => {
        let savedMediaList = this.props.savedMedia.map((item, index) => {
            if(item !== '') {
                return (
                    <UserMediaList postFns={this.openPostModal} mediaImages={this.props.mediaImages} key={index}
                                   media={item}/>
                )
            }
        });
        return savedMediaList;
    };

    makeTaggedMedia = () => {
        let taggedList = this.props.tagMediaList.map((item, index) => {
            if(item !== '') {
                return (
                    <UserMediaList postFns={this.openPostModal} mediaImages={this.props.mediaImages} key={index}
                                   media={item}/>
                )
            }
        });
        return taggedList;
    };

    callAddMediaAction = (file, desc, tags) => {
        this.props.addMediaAction(file, desc, this.props.id, tags);
    };

    openProfilePicModal = () => {
        document.getElementById("profilePicModal").classList.remove("hide");
    };

    removeProfilePic = () => {
        this.props.removeProfilePicAction(this.props.id);
        document.getElementsByClassName("profilePic")[0].setAttribute('src', this.props.generalImages['default.png']);
    };

    changeProflePic = (file) => { //make this action and service, change profile should work, maybe pass back the route to img and change it here when component updates
        document.getElementById("changeProfileModal").classList.add("hide");
        this.props.changeProfilePicAction(file, this.props.id);
    };

    followUser = () => {
        this.props.createFollowAction(this.props.id, this.props.followerUsernameID);
        this.props.createNotificationAction(this.props.id, this.props.followerUsernameID, 'follow', '-1');
    };

    render() {
        let profileMediaList = '';
        let savedMediaList = '';
        let taggedMediaList = '';
        if(this.props.media !== '' && this.state.postMedia) {
            profileMediaList = this.makeMedia();
        }
        if(this.props.savedMedia !== '') {
            savedMediaList = this.makeSavedMedia();
        }
        if(this.props.tagMediaList !== '') {
            taggedMediaList = this.makeTaggedMedia();
        }
        return (
            <div className="content-header">
                <ProfileOptionsModal/>
                <CreatePostModal tagsOptions={this.props.tagsOptionsList} createdMediaFns={this.callAddMediaAction}/>
                <PostModal/>
                <ProfilePicModal removeProfilePicFns={this.removeProfilePic} changeProfilePicFns={this.changeProflePic}/>
                <ChangeProfileModal changeProfileFns={this.changeProflePic}/>
                <div className="profile-gutter">
                    <div className="user-info-container">
                        <div className="profile-pic-container">
                            <div className="profile-pic-container-inner">
                                <div onClick={this.openProfilePicModal} className="change-profile-pic material-icons">add_a_photo</div>
                                <img className="profilePic" src={this.state.profileMedia && this.state.profileMedia !== '' ? this.props.profileImages[this.state.profileMedia] : this.props.generalImages['default.png']} alt=""/>
                            </div>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-content-container">
                                <div className="information-container-top">
                                    <div className="profile-username">{this.props.followerUsernameUsername ? this.props.followerUsernameUsername : this.props.username ? this.props.username : ''}</div>
                                    <div className="profile-edit">
                                        <button onClick={this.toSettings} className={this.state.profileTracker == 'profile' ? 'btn-edit' : 'hide'} type={'button'}>Edit Profile</button>
                                        {this.state.profileTracker == 'profile' ? '' : this.props.followerUsernameFollowsUser == 0 ? <button onClick={this.followUser} className={this.state.profileTracker == 'profile' ? "hide" : 'follow-back-btn'}>Follow Back</button> : <button className={this.state.profileTracker == 'profile' ? "hide" : 'following-btn'}>Following</button>}
                                        <div onClick={this.openProfileOptionsModal} className='cog-icon'/>
                                    </div>
                                </div>
                                <div className="information-container-middle">
                                    <div className="posts">{this.state.numberPosts} posts</div>
                                    <div className="followers">{this.state.numberFollower} followers</div>
                                    <div className="following">{this.state.numberFollowing} following</div>
                                </div>
                                <div className="information-container-bottom">
                                    <div className="first-last-name">{this.props.followerUsernameName ? this.props.followerUsernameName : this.props.name ? this.props.name : ''}</div>
                                    <div className="bio">{this.props.followerUsernameBio === 'none' ? this.props.bio ? this.props.bio : '' : this.props.followerUsernameBio ? this.props.followerUsernameBio : ''}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body-tabs">
                        <ul className="nav nav-tabs tabs-center profile-nav-tabs" data-toggle="tabs">
                            <li className={this.state.activeTab === 'posts' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} ref={this.posts} id="posts" className={"nav-tabs-font"} href="#POSTS">POSTS</a></li>
                            <li className={this.state.profileTracker == 'profile' ? this.state.activeTab === 'igtv' ? 'active tab-pane' :"tab-pane" : 'hide'}><a onClick={this.changeTabs} id="igtv" className={"nav-tabs-font"} href="#IGTV">IGTV</a></li>
                            <li className={this.state.profileTracker == 'profile' ? this.state.activeTab === 'saved' ? 'active tab-pane' :"tab-pane" : 'hide'}><a onClick={this.changeTabs} id="saved" className={"nav-tabs-font"} href="#SAVED">SAVED</a></li>
                            <li className={this.state.activeTab === 'tagged' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="tagged" className={"nav-tabs-font"} href="#TAGGED">TAGGED</a></li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className={this.state.activeTab === 'posts' ? 'active tab-pane' :"tab-pane"} id="POSTS">{profileMediaList !== '' ? profileMediaList : <div className="center">You have no posted any media!</div>}</div>

                        <div className={this.state.activeTab === 'igtv' ? 'active tab-pane' :"tab-pane"} id="IGTV">
                            <div className="profile-igtv-container-padding">
                                <div className="profile-igtv-img-container">
                                    <img className="profile-igtv-img" src={this.props.generalImages['default.png']} alt=""/>
                                </div>
                                <div className="profile-igtv-upload-text">Upload a Video</div>
                                <div className="profile-igtv-details">Videos must be between 1 and 60 minutes long.</div>
                                <button className="notification-follow-btn profile-igtv-btn">Upload</button>
                            </div>
                        </div>

                        <div className={this.state.activeTab === 'saved' ? 'active tab-pane' :"tab-pane"} id="SAVED">{savedMediaList !== '' ? savedMediaList : <div className="center">You have no posted any media!</div>}</div>
                        <div className={this.state.activeTab === 'tagged' ? 'active tab-pane' :"tab-pane"} id="TAGGED">{taggedMediaList}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stats: state.getUserStatsReducer.stats,
        media: state.getUserMediaReducer.media,
        username: state.usernameReducer.username.username,
        name: state.usernameReducer.username.name,
        id: state.usernameReducer.username.id,
        bio: state.usernameReducer.username.bio,
        followerUsernameUsername: state.usernameReducer.username.followerusername,
        followerUsernameID: state.usernameReducer.username.followerid,
        followerUsernameName: state.usernameReducer.username.followername,
        followerUsernameBio: state.usernameReducer.username.followerbio,
        followerUsernameFollowsUser: state.usernameReducer.username.followsUser,
        savedMedia: state.getSavedMediaReducer.savedMedia,
        newMediaID: state.addMediaReducer.newMediaID,
        tagMediaList: state.getTagMediaReducers.tagMediaList,
        tagsOptionsList: state.getTagMediaReducer.tagsOptionsList,
    }
}

export default connect(mapStateToProps, {
    getUserStatsAction,
    getUserMediaAction,
    singlePostInfoAction,
    getFollowerUsernameAction,
    getUsernameAction,
    getSavedMediaAction,
    addMediaAction,
    removeProfilePicAction,
    changeProfilePicAction,
    getTagMediaAction,
    getTagsOptionsAction,
    createNotificationAction,
    createFollowAction,
})(withRouter(authHOC(Profile)));