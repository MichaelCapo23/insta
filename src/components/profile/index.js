import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserStatsAction} from '../../actions/userStatsAction';
import {getUserMediaAction} from "../../actions/getUserMediaAction";
import UserMediaList from './userMediaList';


class Profile extends Component {

    state = {
        data: null,
        username: '',
        numberPosts: '0',
        numberFollower: '0',
        numberFollowing: '0',
        madeMedia: '0',
        activeTab: 'posts'
    };

    changeTabs = (e) => {
        let id = e.target.attributes.id.value;
        this.setState({
            activeTab: id
        })
    };

    // importAll = (r) => {
    //     let images = {};
    //     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    //     return images;
    // };

    componentDidMount() {
        // if(!this.state.profileImages) {
        //     const images = this.importAll(require.context('../../assets/profilePics', false, /\.(png|jpe?g|PNG)$/));
        //     this.setState({
        //         profileImages: images
        //     })
        // }

        //check for the token, if not set then push the user to the signin page, make this a higher order component in the future
        let token = localStorage.getItem('token');
        if(!token) {
            this.props.history.push('/signin');
        }
        //get users stats
        this.props.getUserStatsAction();
        //get user media
        this.props.getUserMediaAction();
    }

    componentDidUpdate() {
        console.log(this.props);
        //if new username is given then set the state with new username
        if (this.state.username !== this.props.username.username) {
            this.setState({
                username: this.props.username.username
            })
        }

        //if new stats are given then set the state
        if(this.props.stats) {
            let {posts, followers, following} = this.props.stats;
            let {numberPosts, numberFollower, numberFollowing} = this.state;
            if(numberPosts !== posts || numberFollower !== followers || numberFollowing !== following) {
                this.setState({
                    numberPosts : posts,
                    numberFollower: followers,
                    numberFollowing: following,
                })
            }
        }

        //if user media changed or has a value, take the list and send it to userMediaList.js
        if(this.props.media && this.state.madeMedia === '0') {
            let postArr = this.props.media.filter(item => {
                return item.mediaType === 'post';
            });

            let profileArr = this.props.media.filter(item => {
                return item.mediaType === 'profile';
            });
            debugger;

            this.setState({
                madeMedia: '1',
                postMedia: postArr,
                profileMedia: profileArr,
            })
        }
    }

    makeMedia = (media) => {
        let profileMediaList = this.state.postMedia.map((media, index) => {
            return (
                <UserMediaList key={index} media={media}/>
            )
        });

        return profileMediaList;
    };

    render() {
        let profileMediaList = '';
        if(this.state.postMedia) {
            profileMediaList = this.makeMedia(this.state.postMedia);
        }

        return (
            <Fragment>
                <div className={"content-header"}>
                    <div className="profile-gutter">
                        <div className="user-info-container">
                            <div className="profile-pic-container">
                                <div className="profile-pic-container-inner">
                                    <img className="profilePic" src={this.props.profileMedia ? this.props.profileImages[this.props.profileMedia[0].fileName] : ''} alt=""/>
                                </div>
                            </div>
                            <div className="profile-info-container">
                                <div className="profile-info-content-container">
                                    <div className="information-container-top">
                                        <div className="profile-username">{this.state.username}</div>
                                        <div className="profile-edit">
                                            <button className={'btn-edit'} type={'button'}>Edit Profile</button>
                                            <div className={'cog-icon'}></div>
                                        </div>
                                    </div>
                                    <div className="information-container-middle">
                                        <div className="posts">{this.state.numberPosts} posts</div>
                                        <div className="followers">{this.state.numberFollower} followers</div>
                                        <div className="following">{this.state.numberFollowing} following</div>
                                    </div>
                                    <div className="information-container-bottom">
                                        <div className="first-last-name">Michael Capobianco</div>
                                        <div className="bio">subscribe for more content!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-body-tabs">
                            <ul className="nav nav-tabs tabs-center profile-nav-tabs" data-toggle="tabs">
                                <li className={this.state.activeTab === 'posts' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} ref={this.posts} id="posts" className={"nav-tabs-font"} href="#POSTS">POSTS</a></li>
                                <li className={this.state.activeTab === 'igtv' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="igtv" className={"nav-tabs-font"} href="#IGTV">IGTV</a></li>
                                <li className={this.state.activeTab === 'saved' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="saved" className={"nav-tabs-font"} href="#SAVED">SAVED</a></li>
                                <li className={this.state.activeTab === 'tagged' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="tagged" className={"nav-tabs-font"} href="#TAGGED">TAGGED</a></li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <div className={this.state.activeTab === 'posts' ? 'active tab-pane' :"tab-pane"} id="POSTS">{profileMediaList !== '' ? profileMediaList : <div className="center">You have no posted any media!</div>}</div>
                            <div className={this.state.activeTab === 'igtv' ? 'active tab-pane' :"tab-pane"} id="IGTV">IGTV</div>
                            <div className={this.state.activeTab === 'saved' ? 'active tab-pane' :"tab-pane"} id="SAVED">SAVED</div>
                            <div className={this.state.activeTab === 'tagged' ? 'active tab-pane' :"tab-pane"} id="TAGGED">TAGGED</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        stats: state.getUserStatsReducer.stats,
    }
}

export default connect(mapStateToProps, {
    getUserStatsAction, getUserMediaAction,
})(withRouter(Profile));