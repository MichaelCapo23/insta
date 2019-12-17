import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getLandingAction} from '../../actions/getLandingMediaAction'
import getLandingMediaReducer from "../../reducers/getLandingMediaReducer";
import LandingPostList from './landingPostList';
import UserMediaList from "../profile/userMediaList";

class Landing extends Component {

    state = {
        data: null,
        images: null,
        landingMedia: null,
    };

    componentDidMount() {
        this.props.getLandingAction()
    }

    componentDidUpdate() {
        debugger;
        let {landingMedia} = this.props;
        if(landingMedia !== this.state.landingMedia) {
            this.setState({
                landingMedia: landingMedia,
            })
        }
    }

    makeLandingPostList = (emdia) => {
        let PostList = this.state.landingMedia.map((item, index) => {
            return (
            <LandingPostList key={index} media={item} />
            )
        });
        return PostList;
    };

    render() {
        let landingPostList = '';
        if(this.state.landingMedia) {
            landingPostList = this.makeLandingPostList(this.state.landingMedia);
        }
        return (
            <Fragment>
                <div className={"content-header"}>
                    <div className="landing-gutter">
                        <div className="media-container">

                        </div>
                        <div className="information-container">
                            <div className="landing-profile">
                                <div className="profile-pic-landing">
                                    <img className='user-profile' src={this.state.images ? this.state.images[this.props.fileName] : ''} alt=""/>
                                </div>
                                <div className="profile-info-landing">
                                    <div className="username-landing">mikeCapo23</div>{/*this.props.username*/}
                                    <div className="name-landing">mike capo</div>{/*{this.props.name}*/}
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
        username: state.usernameReducer.username,
        name: state.usernameReducer.name,
        fileName: state.getUserMediaReducer.media.fileName,
        landingMedia: state.getLandingMediaReducer.landingMedia
    }
}
export default connect(mapStateToProps, {
    getLandingAction,
})(withRouter(Landing));