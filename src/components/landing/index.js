import React, {Component, Fragment} from 'react';
import {withRouter, Link} from 'react-router-dom';
import AuthHOC from '../../HOC/authHOC';
import {connect} from 'react-redux';
import {getLandingAction} from '../../actions/getLandingMediaAction'
import LandingPostList from './landingPostList';
import {createCommentAction} from "../../actions/createCommentAction";
import {likeMediaAction} from "../../actions/likeMediaAction";
import {getStoriesProfileAction} from "../../actions/getStoriesProfileAction";
import StoriesPostList from './storiesPostList'
import OptionsModal from './postOptionsModal';
import UnfollowModal from './confirmUnfollowModal';

import 'material-icons';

class Landing extends Component {

    state = {
        data: null,
        landingMedia: null,
        commentID: null,
        likedID: null,
        lastUnfollowID: null,
        stories: '',
        posterid: '',
        username: '',
        filename:'',
    };

    componentWillMount() {
        if(this.props.id) {
            this.props.getLandingAction(this.props.id);
            this.props.getStoriesAction(this.props.id);
        }
    }

    makeLandingPostList = () => {
        let PostList = '';
        if(this.props.landingMedia.length > 0) {
            PostList = this.props.landingMedia.map((item, index) => {
                return (
                    <LandingPostList likeFunction={this.calLikeAction} openModal={this.openOptionsModal}
                                     commentFunction={this.callCommentAction} key={index} images={{
                        mediaImages: this.props.mediaImages,
                        profileImages: this.props.profileImages,
                        generalImages: this.props.generalImages
                    }} media={item}/>
                )
            });
        }
        return PostList;
    };

    makeStories = () => {
        let stories = this.props.stories.stories.map((item, index) => {
            return (
                <StoriesPostList stories={item} key={index} />
            )
        });
        return stories
    };

    callCommentAction = (input) => {
        let mediaID = input.attributes['data-media'].value;
        let comment = input.value;
        input.value = '';
        this.props.createCommentAction({userID:this.props.id, mediaID, comment})
    };

    calLikeAction = (likeBtn) => {
        let mediaID = likeBtn.attributes['data-media'].value;
        let userID = this.props.id;
        this.props.likeMediaAction({userID, mediaID});
    };

    openOptionsModal = (userValues) => {
        this.setState({
            posterid: userValues.posterID.value,
            username: userValues.username.value,
            filename: userValues.filename.value,
        });
        document.getElementById("optionsModal").classList.remove("hide");
    };

    openUnfollowModal = () => {
        document.getElementById("unfollowModal").classList.remove("hide");
    };

    componentDidUpdate() {
        if(this.props.commentID !== this.state.commentID || this.props.likedID !== this.state.likedID || this.props.unfollowID !== this.state.lastUnfollowID, this.props.viewedIDs !== this.state.viewedIDs) { //add last watched stories to this when made
            this.props.getLandingAction(this.props.id);
            this.props.getStoriesAction(this.props.id, 'profile');
            this.setState({
                landingMedia: this.props.landingMedia,
                commentID: this.props.commentID,
                likedID: this.props.likedID,
                lastUnfollowID: this.props.unfollowID,
                stories: this.props.stories,
                viewedIDs: this.props.viewedIDs,
            })
        }
    }

    openStory = () => {
        this.props.history.push({
            pathname: '/stories',
            data: { data: 'update' }
        });
    };

    render() {
        let landingPostList = '';
        let storiesList = '';
        if(this.props.landingMedia && this.props.landingMedia !== '') {
            landingPostList = this.makeLandingPostList();
        }

        if(this.props.stories  && this.props.stories !== '') {
            storiesList = this.makeStories();
        }
        debugger;
        return (
            <Fragment>
                <OptionsModal openUnfollowModal={this.openUnfollowModal}/>
                <UnfollowModal images={this.props.profileImages} userValues={{posterid: this.state.posterid, username: this.state.username, filename:this.state.filename}}/>
                <div className={"content-header"}>
                    <div className="landing-gutter">
                        <div className="media-container">{landingPostList === '' ? <div className="no-post-container"><div className="no-posts-text">No Posts!</div><Link className="new-media-text" to="/explore">Explore New Media Here!</Link></div> : landingPostList}</div>
                        <div className="information-container">
                            <div className="landing-profile">
                                <div className="profile-pic-landing">
                                    <img className='user-profile' src={this.props.landingMedia ? this.props.landingMedia.status === 'NO' ? this.props.generalImages['default.png'] : this.props.profileImages[this.props.landingMedia[0].posterFileName] : this.props.generalImages['default.png']} alt=""/>
                                </div>
                                <div className="profile-info-landing">
                                    <div className="username-landing">{this.props.username ? this.props.username : ''}</div>
                                    <div className="name-landing">{this.props.name ? this.props.name : ''}</div>
                                </div>
                            </div>
                            <div className="stories-container">
                                <div className="stories-header">
                                    <div className="stories-title">Stories</div>
                                    <div onClick={this.openStory} className="stories-watch-all">Watch all</div>
                                </div>
                                <div className="stories-container-inner">{storiesList}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    return {
        landingMedia: state.getLandingMediaReducer.landingMedia,
        commentID: state.createCommentReducer.commentID,
        likedID: state.likeMediaReducer.likedID,
        unfollowID: state.unfollowUserReducer.unfollowID,
        stories: state.getStoriesProfileReducer.stories,
        viewedIDs: state.updateViewedStoriesReducer.viewedIDs,
    }
}
export default connect(mapStateToProps, {
    getLandingAction,
    createCommentAction,
    likeMediaAction,
    getStoriesAction: getStoriesProfileAction,
})(withRouter(AuthHOC(Landing)));