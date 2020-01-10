import React, {useState} from 'react';
import moment from "moment";

export default props => {
    let [disabledVal, enableBtn] = useState(true);
    let {accountID, comment, username, profileFileName, created_at} = props.comments;
    let {profileImages, generalImages, mediaImages} = props.images;
    debugger;
    let now  = moment();
    let then = moment(created_at);
    let ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
    let d = moment.duration(ms);

    return (
        <div className="comment-list-container">
            <div className="comment-list-img-container">
                <img className="comment-list-img" src={profileFileName == 'default' ? generalImages['default'] : profileImages[profileFileName]} alt=""/>
            </div>
            <div className="comment-list-username-comment-container">
                <div className="comment-list-username">{username}     {comment}</div>
                <div className="comment-list-info-container">
                    <div className="comment-list-created-at">{d.weeks() > 0 ? d.weeks()+'w' : d.days() > 0 ?  d.days()+'h' : d.hours() > 0 ? d.hours()+'h' : d.minutes()+'m'}</div>
                    {/*<div className="comment-list-comment-likes">{}</div>*/}
                    <div className="comment-list-reply">Reply</div>
                </div>
            </div>
        </div>
    )
}