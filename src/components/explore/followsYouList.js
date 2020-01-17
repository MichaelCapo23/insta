import React, {useState, useRef} from 'react';

export default props => {

    let {username, fileName, type, ID} = props.person;

    return (
        <div className="follows-you-overall-container">
            <div className="follows-you-profile-img">
                <img className="follows-you-img" src={fileName === 'default' ? props.images.generalImages['default.png'] : props.images.profileImages[fileName]} alt="profile"/>
            </div>
            <div className="follows-you-username">{username}</div>
            <div className="follows-you-description">{type === 'followed' ? 'Follows You' : 'Suggested follow'}</div>
            <button className="follows-you-follow-btn">Follow</button>
        </div>
    )
}