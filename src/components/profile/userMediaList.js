import React from 'react';
import {Link} from 'react-router-dom';
export default props => {
    debugger
    let {fileName, likes, comments} = props.media;
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const images = importAll(require.context('../../assets/media', false, /\.(png|jpe?g|PNG)$/));
    return (
        <Link to={"/"}>
            <div className="overall-container">
                <img className={"media-post-profile"} src={images[fileName]} alt="instagram media post"/>
                <div className="overlay"/>
                <div className="material-icons inline-comments">thumb_up <span className={"font"}>{comments}</span></div>
                <div className="material-icons inline-likes">mode_comment <span className={"font"}>{likes}</span></div>
            </div>
        </Link>
    )
}