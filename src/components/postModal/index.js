import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCommentAction} from '../../actions/createCommentAction';
import {getNotificationsAction} from "../../actions/getNotificationsAction";
import ModalCommentList from './modalCommentList';
import {singlePostInfoAction} from '../../actions/singlePostInfoAction'
import AuthHOC from '../../HOC/authHOC';

class PostModal extends Component {
    constructor(props) {
        super(props);
        this.myInput = React.createRef();
    }

    state = {
        enableBtn: true,
        commentID: '',
    };

    closeModal = (e) => {
        if(e.target.classList[0] === 'post-modal-overall-container') {
            document.getElementById('postModal').classList.add("hide");
        }
    };

    createComment = () => {
        this.props.createCommentAction({userID: this.props.id, comment: this.myInput.current.value, mediaID: this.props.singlePostInfo.mediaID});
        // this.props.getNotificationsAction()
    };

    enableBtnVal = () => {
        if(this.myInput.current.value !== '') {
            this.setState({
                enableBtn: false
            })
        } else {
            this.setState({
                enableBtn: true
            })
        }
    };

    componentDidUpdate() {
        if((this.props.commentID.commentID !== '' && this.props.singlePostInfo !== '') && this.props.commentID.commentID != this.state.commentID ) {
            debugger;
            this.setState({
                commentID: this.props.commentID.commentID
            });
            this.props.singlePostInfoAction(this.props.singlePostInfo.mediaID, this.props.id);
        }
    }

    makeCommentsList = () => {
        let commentsList = this.props.singlePostInfo.comments.map((item, index) => {
            return <ModalCommentList comments={item} images={{mediaImages:this.props.mediaImages,profileImages:this.props.profileImages,generalImages:this.props.generalImages}} key={index}/>
        });
        return commentsList;
    };

    render () {
        let commentsList = '';
        if(this.props.singlePostInfo != '') {
            commentsList = this.makeCommentsList();
        }
        return (
            <div onClick={this.closeModal} id="postModal" className="post-modal-overall-container hide"> {/*onClick={this.closeModal}*/}
                <div className="post-modal-page-padding">
                    <div className="post-modal-gutter">
                        <div className="post-modal-content-grid">
                            <div className="post-modal-img-container">
                                <img className="post-modal-img" src={this.props.singlePostInfo ? this.props.singlePostInfo.mediaFileName === 'default' ? this.props.generalImages['default.png'] : this.props.mediaImages[this.props.singlePostInfo.mediaFileName]  : this.props.generalImages['default.png']}  alt=""/>
                            </div>
                            <div className="post-modal-content-left-container">
                                <div className="post-modal-content-header">
                                    <div className="post-modal-left-img-container">
                                        <img className="post-modal-left-img" src={this.props.singlePostInfo ? this.props.singlePostInfo.profileFileName === 'default' ? this.props.generalImages['default.png'] : this.props.profileImages[this.props.singlePostInfo.profileFileName] : this.props.generalImages['default.png']} alt=""/>
                                    </div>
                                    <div className="post-modal-content-left-top-container">
                                        <div className="post-modal-content-left-username">{this.props.singlePostInfo ? this.props.singlePostInfo.username : ''}</div>
                                        <div className="post-modal-content-left-dot">•</div>
                                        <div className="post-modal-content-left-follow">Follow</div>
                                    </div>
                                    <div className="post-modal-content-left-ellipsis-container">
                                        <img className="post-modal-content-left-ellipsis-img" src={this.props.generalImages['ellipsis.png']} alt=""/>
                                    </div>
                                </div>
                                <div className="post-modal-comments-container">{commentsList}</div>
                                <div className="post-modal-likes-media-container"></div>
                                <div className="post-modal-add-comment">
                                    <input ref={this.myInput} onChange={this.enableBtnVal} placeholder="Add a comment..." className="add-comment-input" type="text" maxLength="140" name="comment"/>
                                    <button onClick={this.createComment} disabled={this.state.enableBtn} className="post-media-add-comment-btn btn">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        singlePostInfo: state.singlePostInfoReducer.singlePostInfo,
        commentID: state.createCommentReducer.commentID,
    }
}

export default connect(mapStateToProps, {
    createCommentAction,
    singlePostInfoAction,
})(AuthHOC(PostModal));