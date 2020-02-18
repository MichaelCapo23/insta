import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCommentAction} from '../../actions/createCommentAction';
import {getNotificationsAction} from "../../actions/getNotificationsAction";
import ModalCommentList from './modalCommentList';
import {singlePostInfoAction} from '../../actions/singlePostInfoAction'
import AuthHOC from '../../HOC/authHOC';
import {createNotificationAction} from '../../actions/createNotificationAction';
import {saveMediaAction} from '../../actions/saveMediaAction';
import {likeMediaAction} from '../../actions/likeMediaAction';
import moment from "moment";

class PostModal extends Component {
    constructor(props) {
        super(props);
        this.myInput = React.createRef();
        this.saveBtn = React.createRef();
        this.likeBtn = React.createRef();

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
        this.props.createNotificationAction(this.props.id, this.props.singlePostInfo.accountID, 'comment', this.props.singlePostInfo.mediaID);
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

    callSaveMediaAction = () => {
        this.props.saveMediaAction(this.props.id, this.props.singlePostInfo.mediaID);
        this.saveBtn.current.textContent = "bookmark";
    };

    calLikeAction = () => {
        let userID = this.props.id;
        let mediaID = this.props.singlePostInfo.mediaID;
        this.props.likeMediaAction({userID, mediaID});
        debugger;
        if(this.likeBtn.current.attributes.src.value === this.props.generalImages['heartRed.png']) {
            this.likeBtn.current.setAttribute('src',this.props.generalImages['heartClear.jpg']);
        } else {
            this.likeBtn.current.setAttribute('src',this.props.generalImages['heartRed.png']);
            this.props.createNotificationAction(this.props.id, this.props.singlePostInfo.accountID, 'like', this.props.singlePostInfo.mediaID);
        }
    };

    callCommentIcon = () => {
        this.myInput.current.focus();
        this.myInput.current.select();
    };

    render () {
        let commentsList = '';
        let minutes = '';
        let hours = '';
        let days = '';
        if(this.props.singlePostInfo != '') {
            debugger
            if( this.props.singlePostInfo.mediaFileName === 'default') {
                document.getElementsByClassName('post-modal-img-container')[0].style.backgroundImage = `url(${this.props.generalImages['default.png']})`;
            } else {
                document.getElementsByClassName('post-modal-img-container')[0].style.backgroundImage = `url(${this.props.mediaImages[this.props.singlePostInfo.mediaFileName]})`;
            };

            commentsList = this.makeCommentsList();
            let now  = moment();
            let then = moment(this.props.singlePostInfo.mediaCreatedAt);

            let ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
            let d = moment.duration(ms);

            days = d.days();
            hours = d.hours();
            minutes = d.minutes();
        }



        return (
            <div onClick={this.closeModal} id="postModal" className="post-modal-overall-container hide"> {/*onClick={this.closeModal}*/}
                <div className="post-modal-page-padding">
                    <div className="post-modal-gutter">
                        <div className="post-modal-content-grid">
                            <div className="post-modal-img-container">
                                {/*<img className="post-modal-img" src={this.props.singlePostInfo ? this.props.singlePostInfo.mediaFileName === 'default' || this.props.singlePostInfo.mediaFileName === '' ? this.props.generalImages['default.png'] : this.props.mediaImages[this.props.singlePostInfo.mediaFileName]  : this.props.generalImages['default.png']}  alt=""/>*/}
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
                                <div className="post-modal-likes-media-container">
                                    <div className="top-icon-container">
                                        <div className="heart-container">
                                            <img ref={this.likeBtn} onClick={this.calLikeAction} data-media="4" className="heart-img-landing" src={this.props.singlePostInfo ? this.props.singlePostInfo.userLiked == 0 ? this.props.generalImages['heartClear.jpg'] :  this.props.generalImages['heartRed.png'] : this.props.generalImages['heartClear.jpg']} alt=""/>
                                        </div>
                                        <div className="comment-container">
                                            <img onClick={this.callCommentIcon} className="comment-img-landing" src={this.props.generalImages['comment.png']} alt=""/>
                                        </div>
                                        <div ref={this.saveBtn} onClick={this.callSaveMediaAction} className="material-icons landing-bookmark">{this.props.singlePostInfo ? this.props.singlePostInfo.userSaved == 0 ? 'bookmark_border' : 'bookmark' : 'bookmark_border'}</div>
                                    </div>
                                    <div className="post-modal-data-container">
                                        <div className="post-modal-data-img-container">
                                            <img data-media="4" className="profile-media-img" src={this.props.singlePostInfo ? this.props.singlePostInfo.profileFileName == 'default' ? this.props.generalImages['default.png'] : this.props.profileImages[this.props.singlePostInfo.profileFileName] : this.props.generalImages['default.png']} alt=""/>
                                        </div>
                                        <div className="post-modal-data-likes-info-container">{this.props.singlePostInfo ? this.props.singlePostInfo.likes.length == 0 ? '' :  this.props.singlePostInfo.likes.length == 1 ? `Liked by ${this.props.singlePostInfo.likes[0].username}` : `Liked by ${this.props.singlePostInfo.likes[0].username} and ${this.props.singlePostInfo.likes.length - 1} others` : ''}</div>
                                        <div className="post-modal-created-at-container">
                                            <div className="post-modal-time">{this.props.singlePostInfo ? days > 0 ? days + ' DAYS AGO' : hours > 0 ? hours + ' HOURS AGO' : minutes + ' MINUTES AGO' : ''}</div>
                                        </div>
                                    </div>
                                </div>
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
    createNotificationAction,
    saveMediaAction,
    likeMediaAction,
})(AuthHOC(PostModal));