import React from 'react';
import {Link} from 'react-router-dom';
export default props => {
    let {fileName, likes, comments} = props.landingMedia;
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const images = importAll(require.context('../../assets/media', false, /\.(png|jpe?g|PNG)$/));
    return (
        <Link to={"/"}>

        </Link>
    )
}