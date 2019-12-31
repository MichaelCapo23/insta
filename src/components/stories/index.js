import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHOC from '../../HOC/authHOC';
import {getStoriesMediaAction} from "../../actions/getStoriesMediaAction";
import moment from "moment";

class Stories extends Component {

    state = {
        storiesMedia: '',
        actionCalled: false,
        currentMedia: '',
        currentStoryIndex: 0,
        currentStoryIndexChild: 0,
        mediaJSX: '',
    };

    componentDidUpdate() {
        if(this.props.id && this.state.storiesMedia === '' && !this.state.actionCalled) {
            this.props.getStoriesMediaAction(this.props.id);
            this.setState({
                actionCalled: true
            })
        }

        if(this.props.storiesMedia !== '' && this.state.storiesMedia === '') {
            debugger;
            this.setState({
                storiesMedia: this.props.storiesMedia.stories,
            }, () => {this.displayMedia()})
        }
    }

    displayMedia = async  () => { //check if child index exists, check if next currentStoryIndex exists if not send them back to /
        let {storiesMedia, currentStoryIndex, currentMedia, currentStoryIndexChild} = this.state;
        if(storiesMedia[currentStoryIndex]) {
            currentMedia = storiesMedia[currentStoryIndex];
        } else {
            this.props.history.push('/');
            return false;
        }

        debugger;
        if (!currentMedia[currentStoryIndexChild]) {
            this.props.history.push('/');
            return false;
        }

        //check filetype and give html accordingly
        let extension = currentMedia[currentStoryIndexChild].fileName.split('.').pop();
        let mediaJSX = '';
        if(extension == 'MOV' || extension == 'MP4' || extension == 'AVI' || extension == 'FLV' || extension == 'WMV') {
            mediaJSX = <video id="myVideo" width="320" height="176" controls>
                <source id="story-video" src={currentMedia[currentStoryIndexChild].fileName} type={'video/'+extension}/>
                Your browser does not support HTML5 video.
            </video>

        } else {
            mediaJSX = <div className="story-media-containerInfo">
                <img className="story-img" src={this.props.mediaImages[currentMedia[currentStoryIndexChild].fileName]} alt="story"/>
            </div>
        }

        //increment child value if next index exists, if not increment index of array
        if(!currentMedia[currentStoryIndexChild+1]) {
            await this.setState({
                currentStoryIndex: currentStoryIndex+1,
                currentStoryIndexChild: 0,
                mediaJSX: mediaJSX,
            }, () => { return false;})
        } else {
            await this.setState({
                currentStoryIndexChild: currentStoryIndexChild+1,
                mediaJSX: mediaJSX,
            }, () => { return false;})
        }
    };

    render() {
        if(this.state.storiesMedia) {
            if (document.getElementById("story-video")) {
                let vid = document.getElementById("story-video");
                setTimeout(this.displayMedia, vid.duration);
            } else {
                setTimeout(this.displayMedia, '5000');
            }
        }
        return (
            <div className="stories-container-stories">
                <div className="stories-gutter">
                    <div className="stories-header-container">
                        <div className="profile-info">
                            <div className="stories-profile-img-container">
                                <img className="stories-profile-img" src="" alt="profile"/>
                            </div>
                            <div className="stories-username">usernamehereeeee</div>
                            <div className="stories-posted-at">1h</div>
                        </div>
                        <div className="stories-paused">Paused</div>
                        <div className="stories-option">
                            <img className="stories-ellipsis" src={this.props.generalImages['ellips.png']} alt=""/>
                        </div>
                        <div className="table-div">
                            <div className="tr-div">
                                {this.state.storiesMedia[this.state.currentStoryIndex] !== '' && this.state.storiesMedia[this.state.currentStoryIndex] !== undefined ? this.state.storiesMedia[this.state.currentStoryIndex].map((iem, index) => {
                                    return <div key={index} className="td-div"/>
                                }) : ''}
                            </div>
                        </div>
                    </div>
                    <div className="stories-media-container">{this.state.mediaJSX}</div>
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
})(AuthHOC(Stories))