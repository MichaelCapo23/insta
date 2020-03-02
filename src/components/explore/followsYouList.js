import React from 'react';

export default props => {
    let {username, fileName, ID, followsYou} = props.person;

    function followUser() {
        props.followFns(ID);
        document.querySelector(`#container-${ID}.follows-you-overall-container`).classList.add('hide');
    }

    return (
        <div id={'container-'+ID} className="follows-you-overall-container">
            <div className="follows-you-profile-img">
                <img className="follows-you-img" src={fileName === 'default' ? props.images.generalImages['default.png'] : props.images.profileImages[fileName]} alt="profile"/>
            </div>
            <div className="follows-you-username">{username}</div>
            <div className="follows-you-description">{followsYou == '1' ? 'Follows You' : 'Suggested follow'}</div>
            <button onClick={(e) => followUser()} className="follows-you-follow-btn">Follow</button>
        </div>
    )
}