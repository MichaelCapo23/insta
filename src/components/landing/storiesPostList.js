import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHOC from '../../HOC/authHOC'

class StoriesPostList extends Component {

    state = {
        profileFileName: '',
        username: '',
        name: '',
        id: '',
    };

    componentDidMount(){
        let profileObj = this.props.stories[0];
        this.setState({
            profileFileName: profileObj.fileName,
            username: profileObj.username,
            name: profileObj.name,
            id: profileObj.ID,
        })
    };

    openStory = () => {
        this.props.history.push('/stories');
    };


    render() {
        let {profileFileName, username, name, id} = this.state;
        return (
            <div onClick={this.openStory} className="list-stories-container">
                <div className="list-stories-profile-img-container">
                    <img className="list-stories-img" src={this.props.profileImages[profileFileName]} alt="profile img"/>
                </div>
                <div className="list-stories-username-time-container">
                    <div className="list-stories-username">{username}</div>
                    <div className="list-stories-time-posted">3 Days Ago</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, {

})(AuthHOC(StoriesPostList));

