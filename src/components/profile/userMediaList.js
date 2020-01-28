import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
export default props => {

    const profilePost = useRef();

    let {mediaID, fileName, likes, comments} = props.media;

    function openPostModalMedia(profilePost) {
        let postid = profilePost.current.attributes['data-id'].value;
        props.postFns(postid);
    }

    return (
        <div ref={profilePost} onClick={(e) => openPostModalMedia(profilePost)} data-id={mediaID} className="overall-container">
            <img className={"media-post-profile"} src={props.mediaImages[fileName]} alt="instagram media post"/>
            <div className="overlay"/>
            <div className="material-icons inline-comments">thumb_up <span className={"font"}>{comments}</span></div>
            <div className="material-icons inline-likes">mode_comment <span className={"font"}>{likes}</span></div>
        </div>
    )
}