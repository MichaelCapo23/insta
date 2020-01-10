import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
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
        profileObj.created_at = moment(profileObj.created_at).format('YYYY-MM-DD, HH:mm:ss');
        profileObj.storyCreatedAt = moment(profileObj.storyCreatedAt).format('YYYY-MM-DD, HH:mm:ss');

        let now  = moment();
        let then = moment(profileObj.storyCreatedAt);

        let ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
        let d = moment.duration(ms);

        this.setState({
            profileFileName: profileObj.fileName,
            username: profileObj.username,
            name: profileObj.name,
            id: profileObj.ID,
            time:profileObj.created_at,
            story_time: profileObj.storyCreatedAt,
            days: d.days(),
            hours: d.hours(),
            minutes: d.minutes(),
        });
    };

    openStory = () => {
        this.props.history.push({
            pathname: '/stories',
            data: { data: 'update' }
        });
    };


    render() {
        let {profileFileName, username, id, days, minutes, hours} = this.state;
        return (
            <div data-id={id} onClick={this.openStory} className="list-stories-container">
                <div className="list-stories-profile-img-container">
                    <img className="list-stories-img" src={this.props.profileImages[profileFileName]} alt="profile img"/>
                </div>
                <div className="list-stories-username-time-container">
                    <div className="list-stories-username">{username}</div>
                    <div className="list-stories-time-posted">{days > 0 ? days + ' Days Ago' : hours > 0 ? hours + ' Hours Ago' : minutes + ' Minutes Ago'}</div>
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

