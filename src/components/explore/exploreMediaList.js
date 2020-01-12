import React, {useRef} from 'react';
export default props => {
    let {ID, accountID, fileName, likes, comments} = props.post;

    function openPostModalMedia(explorePost) {
        let postid = explorePost.current.attributes['data-id'].value;
        props.openPostModal(postid);
    }

    const explorePost = useRef();

    return (
        <div ref={explorePost} onClick={(e) => openPostModalMedia(explorePost)} className="explore-media-list-overall" data-id={ID} data-accountid={accountID}>
            <img className={"media-post-profile"} src={props.images.mediaImages[fileName]} alt="instagram media post"/>
            <div className="overlay"/>
            <div className="material-icons inline-comments">thumb_up <span className={"font"}>{likes}</span></div>
            <div className="material-icons inline-likes">mode_comment <span className={"font"}>{comments}</span></div>
        </div>
    )
}