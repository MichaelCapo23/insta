import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getLandingAction} from '../../actions/getLandingMediaAction'
import LandingPostList from './landingPostList';
import {createCommentAction} from "../../actions/createCommentAction";
import 'material-icons';

class Landing extends Component {

    state = {
        data: null,
        images: null,
        landingMedia: null,
    };

    componentDidMount() {
        this.props.getLandingAction()
    }

    makeLandingPostList = () => {
        let PostList = this.props.landingMedia.map((item, index) => {
            return (
                <LandingPostList onChangeFns={this.callCommentAction} key={index} media={item} />
            )
        });
        return PostList;
    };

    callCommentAction = (e, input) => {
        debugger;
        let mediaID = e.currentTarget.attributes.postID;
        let comment = input
        // this.props.createCommentAction() //add the values to use in axios
    };

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
                                    <img className='user-profile' src={this.state.images ? this.state.images[this.props.fileName] : ''} alt=""/>
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
        username: state.usernameReducer.username.username,
        name: state.usernameReducer.username.name,
        fileName: state.getUserMediaReducer.media.fileName,
        landingMedia: state.getLandingMediaReducer.landingMedia
    }
}
export default connect(mapStateToProps, {
    getLandingAction,
    createCommentAction,
})(withRouter(Landing));