import React from 'react';
import {Link} from "react-router-dom";

export default props => {
    let {ID, username, name, fileName} = props.searchResult;
    return (
        <Link to={`/profile/${username}`}>
            <div className="searchbar-item-container">
                <div className="searchbar-item-img-container">
                    <div className="searchbar-item-img-inner">
                        <img className="searchbar-item-img" src={fileName === 'default' ? props.images.generalImages['default.png'] : props.images.profileImages[fileName]} alt=""/>
                    </div>
                </div>
                <div className="searchbar-item-info-container">
                    <div className="searchbar-item-username">{username}</div>
                    <div className="searchbar-item-name">{name}</div>
                </div>
            </div>
        </Link>
    )
}