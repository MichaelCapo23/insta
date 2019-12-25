import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import AuthHOC from '../../HOC/authHOC';
import {connect} from 'react-redux';
import {getLandingAction} from '../../actions/getLandingMediaAction'
import LandingPostList from './landingPostList';
import {createCommentAction} from "../../actions/createCommentAction";
import {likeMediaAction} from "../../actions/likeMediaAction";
import {getStoriesAction} from "../../actions/getStoriesAction";
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
        stories: null,
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
        let PostList = this.props.landingMedia.map((item, index) => {
            return (
                <LandingPostList likeFunction={this.calLikeAction} openModal={this.openOptionsModal} commentFunction={this.callCommentAction} key={index} images={{mediaImages:this.props.mediaImages,profileImages:this.props.profileImages,generalImages:this.props.generalImages}} media={item} />
            )
        });
        return PostList;
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
        if(this.props.commentID !== this.state.commentID || this.props.likedID !== this.state.likedID || this.props.unfollowID !== this.state.lastUnfollowID || this.props.stories !== this.state.stories) {
            debugger;
            this.props.getLandingAction(this.props.id);
            this.props.getStoriesAction(this.props.id);
            this.setState({
                landingMedia: this.props.landingMedia,
                commentID: this.props.commentID,
                likedID: this.props.likedID,
                lastUnfollowID: this.props.unfollowID,
                stories: this.props.stories,
            })
        }
    }

    render() {
        let landingPostList = '';
        if(this.props.landingMedia && this.props.landingMedia !== '') {
            landingPostList = this.makeLandingPostList(this.props.landingMedia);
        }
        return (
            <Fragment>
                <OptionsModal openUnfollowModal={this.openUnfollowModal}/>
                <UnfollowModal images={this.props.profileImages} userValues={{posterid: this.state.posterid, username: this.state.username, filename:this.state.filename}}/>
                <div className={"content-header"}>
                    <div className="landing-gutter">
                        <div className="media-container">{landingPostList}</div>
                        <div className="information-container">
                            <div className="landing-profile">
                                <div className="profile-pic-landing">
                                    <img className='user-profile' src={this.props.landingMedia ? this.props.profileImages[this.props.landingMedia[0].posterFileName] : ''} alt=""/>
                                </div>
                                <div className="profile-info-landing">
                                    <div className="username-landing">{this.props.username ? this.props.username : ''}</div>
                                    <div className="name-landing">{this.props.name ? this.props.name : ''}</div>
                                </div>
                            </div>
                            <div className="stories-container">
                                <div className="stories-header">
                                    <div className="stories-title">Stories</div>
                                    <div className="stories-watch-all">Watch all</div>
                                </div>
                                <div className="stories-container-inner">

                                </div>
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
        stories: state.getStoriesReducer.stories,
    }
}
export default connect(mapStateToProps, {
    getLandingAction,
    createCommentAction,
    likeMediaAction,
    getStoriesAction,
})(withRouter(AuthHOC(Landing)));