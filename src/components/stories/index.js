import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHOC from '../../HOC/authHOC';
import {getStoriesMediaAction} from "../../actions/getStoriesMediaAction";
import moment from "moment";

class Stories extends Component {

    state = {
        storiesMedia: '',
        actionCalled: false,
    };

    componentDidUpdate() {
        debugger;
        if(this.props.id && this.state.stories === '' && !this.state.actionCalled) {
            this.props.getStoriesMediaAction(this.props.id);
            this.setState({
                actionCalled: true
            })
        }

        if(this.props.storiesMedia !== '' && this.state.storiesMedia === '') {
            this.setState({
                stories: this.props.stories,
            })
        }
    }

    render() {
        return (
            <div className="stories-container-stories">
                <div className="stories-gutter">
                    <div className="stories-header-container">
                        <div className="profile-info">
                            <div className="stories-profile-img-container">
                                <img className="stories-profile-img" src="" alt="instagram story profile"/>
                            </div>
                            <div className="stories-username">usernamehereeeee</div>
                            <div className="stories-posted-at">1h</div>
                        </div>
                        <div className="stories-paused">Paused</div>
                        <div className="stories-option">
                            <img className="stories-ellipsis" src={this.props.generalImages['ellips.png']} alt=""/>
                        </div>
                    </div>
                    <div className="stories-media-container"></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        storiesMedia: state.getStoriesMediaReducer.storiesMedia
    }
}

export default connect(mapStateToProps, {
    getStoriesMediaAction,
})(AuthHOC(Stories))