import React, {useState} from 'react';
import {Link} from 'react-router-dom';
export default props => {
    // let [allComments, addStateComment] = useState('');

    let {comments, likes, fileName, posterID, lastLikedFileName, lastLikedUsername, posterFileName, posterUsername} = props.media;
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const mediaImages = importAll(require.context('../../assets/media', false, /\.(png|jpe?g|PNG)$/));
    const profileImages = importAll(require.context('../../assets/profilePics', false, /\.(png|jpe?g|PNG)$/));
    const generalImages = importAll(require.context('../../assets/', false, /\.(png|jpe?g|PNG)$/));

    function newCommentsArr(comments) {
        let arr = [];
        arr.push(comments[0]);
        arr.push(comments[1]);
        arr.push('');
        arr.push(comments[comments.length-1]);
        return arr;
    }
    let threeComments = newCommentsArr(comments);

    function disabledPostBtn(e) {
        debugger;
    }

    function createComment(posterID) {

    }

    return (
        <div userid={posterID} className="landing-media-container">
            <div className="landing-media-header">
                <div className="poster-profile-pic">
                    <img className='poster-profile-pic-img' src={profileImages[posterFileName]} alt="instagram poster profile picture"/>
                </div>
                <div className="poster-username-container">{posterUsername}</div>
                <div className="ellipsis">
                    <img className="ellipsis-img" src={generalImages['ellipsis.png']} alt=""/>
                </div>
            </div>

            <div className="landing-media-pic">
                <img className="landing-media-img" src={mediaImages[fileName]} alt=""/>
            </div>

            <div className="landing-media-footer">
                <div className="material-icons-container">
                    <div className="material-icons like-comment">thumb_up </div>
                    <div className="material-icons like-comment landing-comments">mode_comment</div>
                    <div className="material-icons landing-bookmark">bookmark_border</div>
                </div>
                <div className="liked-container">
                    <div className="last-liked-profile-container">
                        <img className="last-liked-img" src={lastLikedFileName !== 'default.png'? profileImages[lastLikedFileName] : generalImages[lastLikedFileName]} alt='instagram last liked profile picture'/>
                    </div>
                    <div className="last-liked-username">{likes !== 0 ? 'Liked by ': ''}</div>
                    <div className="username">{ likes !== 0 ? lastLikedUsername: ''}</div>
                    <div className="other-and">{ likes - 1 > 0 ? 'and ': ''}</div>
                    <div className="other-likes">{ likes - 1 > 0 ? likes -1 +' others': ''}</div>
                </div>
                <div className="landing-comments-container">
                    {comments.length < 4 ? comments.map((item, index) => (
                        <div key={'landing-inner1'+index} className="comment-container-landing-inner"><span className="commenter-name">{item.commenter}</span><span className="comment-text">{item.comment}</span><span key={index} className="material-icons like-comment-landing">thumb_up</span></div>
                    )) : threeComments.map((item, index) => (
                        (index === 0 || index === 1 || index === 3) ? <div key={'landing-inner'+index} className="comment-container-landing-inner"><span className="commenter-name">{item.commenter}</span><span className="comment-text">{item.comment}</span><span key={index} className="material-icons like-comment-landing">thumb_up</span></div> : <div key={index} className="comment-container-landing-inner"><span className="view-comments-span">View all {comments.length - 3} comments</span></div>
                    ))}
                </div>
                <div className="days-posted-container"></div>
            </div>

            <div className="landing-media-add-comment">
                <input onChange={disabledPostBtn()} placeholder="Add a comment..." className="add-comment-input" type="text" maxLength="140" name="comment"/>
                <button userid={posterID} onClick={createComment(posterID)} className="add-comment-btn btn">Post</button>
            </div>
        </div>
    )
}