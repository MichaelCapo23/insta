import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHOC from '../../HOC/authHOC';

class Stories extends Component {

    state = {

    };

    getUserStories = () => {

    };

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
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, {

})(AuthHOC(Stories))