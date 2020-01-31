import React, {useState, useRef} from 'react';
export default props => {
    let [disabledVal, enableBtn] = useState(true);
    let {mediaID, comments, likes, fileName, posterID, lastLikedFileName, lastLikedUsername, posterFileName, posterUsername, userLiked} = props.media;
    let {profileImages, generalImages, mediaImages} = props.images;

    function newCommentsArr(comments) {
        let arr = [];
        arr.push(comments[0]);
        arr.push(comments[1]);
        arr.push('');
        arr.push(comments[comments.length-1]);
        return arr;
    }
    let threeComments = newCommentsArr(comments);
    const myInput = useRef();
    const likeBtn = useRef();
    const saveBtn = useRef();


    const createComment = (input) => {
        props.commentFunction(input, posterID, mediaID);
        enableBtn(() => {disabledVal = true})
    };

    const likeMedia = (likeBtn) => {
        props.likeFunction(likeBtn);
        likeBtn.setAttribute('src',generalImages['heartRed.png']);
    };

    const openModalFns = () => {
        let imgTag = document.getElementById("ellipsis-img");
        let posterID = imgTag.attributes['data-posterid'];
        let username = imgTag.attributes['data-username'];
        let filename = imgTag.attributes['data-filename'];
        props.openModal({posterID: posterID, username:username, filename:filename});
    };

    function saveMedia() {
        props.saveMediaFns(mediaID);
        saveBtn.current.textContent = "bookmark";
    }

    return (
        <div className="landing-media-container">
            <div className="landing-media-header">
                <div className="poster-profile-pic">
                    <img className='poster-profile-pic-img' src={profileImages[posterFileName]} alt="instagram poster profile picture"/>
                </div>
                <div className="poster-username-container">{posterUsername}</div>
                <div className="ellipsis">
                    <img data-posterid={posterID} data-username={posterUsername} data-filename={posterFileName} onClick={(e) => openModalFns(e)} id='ellipsis-img' className="ellipsis-img" src={generalImages['ellipsis.png']} alt=""/>
                </div>
            </div>

            <div className="landing-media-pic">
                <img className="landing-media-img" src={mediaImages[fileName]} alt=""/>
            </div>

            <div className="landing-media-footer">
                <div className="material-icons-container">
                    <div className="heart-container">
                        <img onClick={(e) => likeMedia(likeBtn.current)} data-media={comments[0].mediaID} ref={likeBtn} className="heart-img-landing" src={userLiked === 1 ? generalImages['heartRed.png'] : generalImages['heartClear.jpg']} alt=""/>{/*generalImages['heartRed.png']*/}
                    </div>
                    <div className="comment-container">
                        <img className="comment-img-landing" src={generalImages['comment.png']} alt=""/>
                    </div>
                    {/*<div className="material-icons like-comment landing-comments">mode_comment</div>*/}
                    <div ref={saveBtn} onClick={saveMedia} className="material-icons landing-bookmark">bookmark_border</div> {/* bookmark <-- this is for when they click it, change to this to show media has been saved*/}
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
                <input data-media={mediaID} ref={myInput} onChange={() => myInput.current.value !== '' ? enableBtn(disabledVal = false) : enableBtn(disabledVal = true)} placeholder="Add a comment..." className="add-comment-input" type="text" maxLength="140" name="comment"/>
                <button onClick={(e) => createComment(myInput.current)} disabled={disabledVal} className="add-comment-btn btn">Post</button>
            </div>
        </div>
    )
}