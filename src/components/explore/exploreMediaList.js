import React from 'react';
export default props => {
    let {fileName, likes, comments} = props.media;
    return (
        <Link to={"/"}>
            <div className="overall-container">
                <img className={"media-post-profile"} src={props.mediaImages[fileName]} alt="instagram media post"/>
                <div className="overlay"/>
                <div className="material-icons inline-comments">thumb_up <span className={"font"}>{comments}</span></div>
                <div className="material-icons inline-likes">mode_comment <span className={"font"}>{likes}</span></div>
            </div>
        </Link>
    )
}