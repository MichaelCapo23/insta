import React from 'react';
import {Link} from 'react-router-dom';
export default props => {
    let {comments, likes, fileName, posterID, lastLikedFileName, lastLikedUsername} = props.media;
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    debugger
    const mediaImages = importAll(require.context('../../assets/media', false, /\.(png|jpe?g|PNG)$/));
    const profileImages = importAll(require.context('../../assets/profilePics', false, /\.(png|jpe?g|PNG)$/));
    const generalImages = importAll(require.context('../../assets/', false, /\.(png|jpe?g|PNG)$/));
    return (
        <div className="landing-media-container">
            <div userid={posterID} className="landing-media-header">

            </div>

            <div className="landing-media-pic">
                <img className="landing-media-img" src={mediaImages[fileName]} alt=""/>
            </div>

            <div className="landing-media-footer">
                <div className="material-icons-container">
                    <div className="material-icons like-comment">thumb_up <span className={"font"}></span></div>
                    <div className="material-icons like-comment landing-comments">mode_comment <span className={"font"}></span></div>
                    <div className="material-icons landing-bookmark">bookmark_border <span className={"font"}></span></div>
                </div>
                <div className="liked-container">
                    <div className="last-liked-profile-container">
                        <img className="last-liked-img" src={lastLikedFileName !== 'default.png'? profileImages[lastLikedFileName] : generalImages[lastLikedFileName]} alt=""/>
                    </div>
                    <div className="last-liked-username">{likes !== 0 ? 'Liked by ': ''}</div>
                    <div className="username">{ likes !== 0 ? lastLikedUsername: ''}</div>
                    <div className="other-and">{ likes > 0 ? 'and ': ''}</div>
                    <div className="other-likes">{ likes > 0 ? likes -1 +' others': ''}</div>

                </div>
            </div>

            <div className="landing-media-add-comment">

            </div>
        </div>
    )
}
// ${(likes -1) > 0 ? `and ${likes -1} others`