import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHOC from '../../HOC/authHOC';
import {getStoriesMediaAction} from "../../actions/getStoriesMediaAction";
import {updateViewedStoriesAction} from "../../actions/updateViewedStoriesAction";

class Stories extends Component {

    state = {
        storiesMedia: '',
        actionCalled: false,
        currentMedia: '',
        currentStoryIndex: 0,
        currentStoryIndexChild: 0,
        mediaJSX: '',
        displayfinished: false,
        isVideo: false,
        viewedStoriesIDs: [],
    };

    componentDidMount() {
        if(this.props.id) {
            this.props.getStoriesMediaAction(this.props.id);
            this.setState({
                actionCalled: true
            })
        }
    }

    componentDidUpdate() {
        if(this.props.id && this.state.storiesMedia === '' && !this.state.actionCalled) {
            this.props.getStoriesMediaAction(this.props.id);
            this.setState({
                actionCalled: true
            })
        }

        if(this.props.storiesMedia !== '' && this.state.storiesMedia === '') {
            this.setState({
                storiesMedia: this.props.storiesMedia.stories,
            }, () => {this.displayMedia()})
        }
    }

    exitStories = () => {
        this.props.updateViewedStoriesAction({userID: this.props.id, storyIDs: this.state.viewedStoriesIDs});
        this.props.history.push('/');
        return false;
    };

    displayMedia = async  () => { //check if child index exists, check if next currentStoryIndex exists if not send them back to /
        let {storiesMedia, currentStoryIndex,currentStoryIndexChild} = this.state;

        //check if current story array exists, then set it, check if current story exits if not route user to landing.
        if(!storiesMedia[currentStoryIndex]) {
            this.props.history.push('/');
            return false;
        }

        if (!storiesMedia[currentStoryIndex][currentStoryIndexChild]) {
            if(!storiesMedia[currentStoryIndex+1]) {
                this.props.updateViewedStoriesAction({userID: this.props.id, storyIDs: this.state.viewedStoriesIDs});
                this.props.history.push('/');
                return false;
            } else {
                await this.setState({
                    currentStoryIndex: currentStoryIndex+1,
                    currentStoryIndexChild: 0
                }, () => {this.makeMediaHTML()})
            }
        } else {
            this.makeMediaHTML();
        }
    };

    makeMediaHTML = async () => {
        //check filetype and give html accordingly
        let {storiesMedia, currentStoryIndex, currentMedia, currentStoryIndexChild, displayfinished} = this.state;
        currentMedia = storiesMedia[currentStoryIndex];
        let extension = currentMedia[currentStoryIndexChild].fileName.split('.').pop();
        let mediaJSX = '';
        if(extension == 'MOV' || extension == 'MP4' || extension == 'AVI' || extension == 'FLV' || extension == 'WMV') {
            mediaJSX = <video id="myVideo" width="100%" height="100%" controls autoPlay muted onLoadedMetadata={this.getVideoTime}>
                <source id="story-video" src={this.props.mediaImages[currentMedia[currentStoryIndexChild].fileName]} type='video/mp4'/>
                Your browser does not support HTML5 video.
            </video>;

            await this.setState({
                currentStoryIndexChild: currentStoryIndexChild+1,
                mediaJSX: mediaJSX,
                displayfinished: true,
                isVideo: true,
                mediaMade: true,
                viewedStoriesIDs: [...this.state.viewedStoriesIDs, currentMedia[currentStoryIndexChild].mediaID],
            })

        } else {
            mediaJSX = <div className="story-media-containerInfo">
                <img onLoad={this.callDisplay} className="story-img" src={this.props.mediaImages[currentMedia[currentStoryIndexChild].fileName]} alt="story"/>
            </div>;

            await this.setState({
                currentStoryIndexChild: currentStoryIndexChild+1,
                mediaJSX: mediaJSX,
                displayfinished: true,
                mediaMade: true,
                viewedStoriesIDs: [...this.state.viewedStoriesIDs, currentMedia[currentStoryIndexChild].mediaID],
            })
        }
    };

    callDisplay = async (time) => {
        if(this.state.displayfinished) {
            if(!this.state.isVideo) {
                time = 4000;
                setTimeout(this.displayMedia, time);
                this.setState({
                    displayfinished: false,
                    isVideo: false,
                    mediaMade: false
                })
            } else {
                time = time * 1000;
                setTimeout(this.displayMedia, time);
                await this.setState({
                    isVideo: false,
                    mediaMade: false
                });
            }
        } else {
            setTimeout(this.displayMedia, time);
            await this.setState({
                displayfinished: true,
            })
        }
    };

    getVideoTime = async () => {
        let time = '4000';
        let vid = document.getElementById("myVideo");
        time = vid.duration;
        this.callDisplay(time);
    };

    render() {
        return (
            <div className="stories-container-stories">
                <div className="stories-gutter">
                    <div className="stories-header-container">
                        <div className="profile-info">
                            <div className="stories-profile-img-container">
                                <img className="stories-profile-img" src={this.state.storiesMedia[this.state.currentStoryIndex] !== '' && this.state.storiesMedia[this.state.currentStoryIndex] !== undefined ? this.props.profileImages[this.state.storiesMedia[this.state.currentStoryIndex].profileFileName] : ''} alt="profile"/>
                            </div>
                            <div className="stories-username">{this.state.storiesMedia[this.state.currentStoryIndex] !== '' && this.state.storiesMedia[this.state.currentStoryIndex] !== undefined ? this.state.storiesMedia[this.state.currentStoryIndex].username : ''}</div>
                            <div className="stories-posted-at">1h</div>
                        </div>
                        <div className="stories-paused">Paused</div>
                        <div className="stories-option">
                            <img className="stories-ellipsis" src={this.props.generalImages['ellips.png']} alt=""/>
                        </div>
                        <div className="table-div">
                            <div className="tr-div">
                                {this.state.storiesMedia[this.state.currentStoryIndex] !== '' && this.state.storiesMedia[this.state.currentStoryIndex] !== undefined ? this.state.storiesMedia[this.state.currentStoryIndex].map((iem, index) => {
                                    return <div key={index} className={Number(this.state.currentStoryIndexChild -1) >= Number(index) ? 'white td-div' : 'td-div'}/>
                                }) : ''}
                            </div>
                        </div>
                    </div>
                    <div className="stories-media-container">
                        <div onClick={this.exitStories} className="exit-stories-container"></div>
                        {this.state.mediaJSX}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        storiesMedia: state.getStoriesMediaReducer.storiesMedia
    }
}

export default connect(mapStateToProps, {
    getStoriesMediaAction,
    updateViewedStoriesAction,
})(AuthHOC(Stories))