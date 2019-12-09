import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
    let fileRoute = '../assets/media/';
    let {fileName, likeCount, commentCount} = props.media;
    return (
        <div>{fileName}</div>
    )
}