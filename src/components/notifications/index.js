import React from 'react';
import {Link} from 'react-router-dom';
import moment from "moment";

export default props => {
    let {notificationFromID, notificationType, username, profileFileName, created_at} = props.notifications;
    let {profileImages, generalImages, mediaImages} = props.images;

    let now  = moment();
    let then = moment(created_at);

    let ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
    let d = moment.duration(ms);

    let days = d.days();
    let hours = d.hours();
    let minutes = d.minutes();

    function followUser() {
        debugger;
        props.followFns(notificationFromID);
        let buttonSelector =  document.querySelector(`#follow-btn-${notificationFromID}.notification-follow-btn`)
        buttonSelector.setAttribute('disabled', 'disabled');
        buttonSelector.classList.add('disable-follow-btn');
    }

    return (
        <div className="cell-padding">
           <div className="notifications-img-container">
               <img src={profileFileName === 'default' ? generalImages['default.png'] : profileImages[profileFileName]} alt="" className="notifications-img"/>
           </div>
            <div className="notification-info-container">
                <Link to={`/profile/${username}`}>
                    <div className="notification-text-container">
                        <div className="notification-username">{username}</div>
                        <div className="notification-text">{notificationType === 'follow' ? 'Started following you.' : notificationType === 'like' ? 'Liked your photo.' : notificationType === 'tag' ? 'Tagged you in a photo.' : notificationType === 'comment' ? 'Commented on your photo.' : ''} <span className="notification-time">{days > 0 ? days + 'd' : hours > 0 ? hours + 'h' : minutes + 'm'}</span></div>
                    </div>
                </Link>
                <button onClick={followUser} id={'follow-btn-'+notificationFromID} type={"button"} className="notification-follow-btn">Follow</button>
            </div>
        </div>
    )
}