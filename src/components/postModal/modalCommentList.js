import React, {useState} from 'react';

export default props => {

    let [disabledVal, enableBtn] = useState(true);
    let {accountID, comment, username, profileFileName} = props.comments;
    let {profileImages, generalImages, mediaImages} = props.images;

    return (
        <div className="comment-list-container">
            <div className="comment-list-img-container">
                <img className="comment-list-img" src={profileFileName == 'default' ? generalImages['default'] : profileImages[profileFileName]} alt=""/>
            </div>
        </div>
    )
}