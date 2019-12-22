import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import AuthHOC from '../../HOC/authHOC';
import {connect} from 'react-redux';
import {getLandingAction} from '../../actions/getLandingMediaAction'
import LandingPostList from './landingPostList';
import {createCommentAction} from "../../actions/createCommentAction";
import 'material-icons';

class Landing extends Component {

    state = {
        data: null,
        landingMedia: null,
    };

    componentWillMount() {
        console.log(this.props);
        this.props.getLandingAction();
    }

    makeLandingPostList = () => {
        let PostList = this.props.landingMedia.map((item, index) => {
            return (
                <LandingPostList onChangeFns={this.callCommentAction} key={index} images={{mediaImages:this.props.mediaImages,profileImages:this.props.profileImages,generalImages:this.props.generalImages}} media={item} />
            )
        });
        return PostList;
    };

    callCommentAction = (input) => {
        debugger;
        let mediaID = input.attributes['data-media'].value;
        let comment = input.value;
        input.value = '';
        this.props.createCommentAction({mediaID, comment})
    };

    componentDidUpdate() {
        if(this.props.landingMedia !== this.state.landingMedia) {
            this.setState({
                landingMedia: this.props.landingMedia
            })
        }
    }

    render() {
        let landingPostList = '';
        if(this.props.landingMedia) {
            landingPostList = this.makeLandingPostList(this.props.landingMedia);
        }
        return (
            <Fragment>
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
        fileName: state.getUserMediaReducer.media.fileName,
        landingMedia: state.getLandingMediaReducer.landingMedia,
        commentID: state.createCommentReducer.commentID,
    }
}
export default connect(mapStateToProps, {
    getLandingAction,
    createCommentAction,
})(withRouter(AuthHOC(Landing)));