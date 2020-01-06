import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHOC from '../../HOC/authHOC';

class PostModal extends Component {

    state = {

    };

    closeModal = (e) => {
        document.getElementById('postModal').classList.add("hide");
    };

    render () {
        return (
            <div onClick={this.closeModal} id="postModal" className="post-modal-overall-container hide">
                <div className="post-modal-content-container">
                    <div className="post-modal-content">
                        <div className="post-modal-img-container">
                            <img className="post-modal-img" src={this.props.generalImages['default.png']} alt=""/>
                        </div>
                        <div className="post-modal-content-left-container">
                            <div className="post-modal-content-header">
                                <div className="post-modal-left-img-container">
                                    <img className="post-modal-left-img" src={this.props.generalImages['default.png']} alt=""/>
                                </div>
                                <div className="post-modal-content-left-top-container">
                                    <div className="post-modal-content-left-username">uesgfughseuifgsue</div>
                                    <div className="post-modal-content-left-dot">.</div>
                                    <div className="post-modal-content-left-follow">Follow</div>
                                </div>
                                <div className="post-modal-content-left-ellipsis-container">
                                    <img className="post-modal-content-left-ellipsis-img" src={this.props.generalImages['ellipsis.png']} alt=""/>
                                </div>
                            </div>
                            <div className="post-modal-comments-container"></div>
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

})(AuthHOC(PostModal));