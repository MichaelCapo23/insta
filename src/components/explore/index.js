import React, {Component} from 'react';
import AuthHOC from '../../HOC/authHOC';
import {suggestedFollowsAction} from '../../actions/suggestedFollowsAction'
import FollowsYouList from './followsYouList';
import {exploreMediaAction} from '../../actions/exploreMediaAction';
import ExploreMediaList from './exploreMediaList';
import {connect} from 'react-redux';

class Explore extends Component {

    state = {
        discoverUsers: '',
        initalMethods: false,
        suggestedList: '',
        exploreMediaList: '',
    };

    componentWillMount() {
        debugger;
        if(this.props.location.state) {
            if (this.props.location.state.id) {
                //call initial actions
                this.props.suggestedFollowsAction(this.props.location.state.id);
                this.props.exploreMediaAction(this.props.location.state.id);
                this.setState({
                    initalMethods: true,
                })
            }
        }
    }

    componentDidUpdate()  {
        debugger;
        if(this.props.id && this.state.discoverUsers === '' && !this.state.initalMethods) {
            this.props.suggestedFollowsAction(this.props.id);
            this.props.exploreMediaAction(this.props.id);
            this.setState({
                initalMethods: true,
            })
        }

        if(this.props.suggestedList !== this.state.suggestedList || this.props.exploreMediaList !== this.state.exploreMediaList) {
            this.setState({
                suggestedList: this.props.suggestedList,
                exploreMediaList: this.props.exploreMediaList,
            })
        }
    }

    makeSuggestions = () => {
        let suggestions = this.state.suggestedList.map((item, index) => {
            return (
                <FollowsYouList person={item} key={index} images={{mediaImages:this.props.mediaImages,profileImages:this.props.profileImages,generalImages:this.props.generalImages}}/>
            )
        });
        return suggestions;
    };

    makeExplorePostList = () => {
        let explorePostList = this.state.exploreMediaList.map((item, index) => {
            return (
                <ExploreMediaList post={item} key={index} images={{mediaImages:this.props.mediaImages,profileImages:this.props.profileImages,generalImages:this.props.generalImages}}/>
            )
        });
        return explorePostList;
    };

    moveRight = (e) => {
        debugger;
        let container = document.getElementById('container');
        let overlay = document.getElementById('overlay');
        container.scrollLeft += 250;
        overlay.style.left += '250px';
        e.preventDefault();
    };

    moveLeft = (e) => {
        debugger;
        let container = document.getElementById('container');
        let overlay = document.getElementById('overlay');
        container.scrollLeft -= 250;
        overlay.style.left -= '250px';
        e.preventDefault();
    };


    render() {
        let suggestions = '';
        let explorePostList = '';
        if(this.state.suggestedList !== '') {
            suggestions = this.makeSuggestions();
        }

        if(this.state.exploreMediaList !== '') {
            explorePostList = this.makeExplorePostList();
        }

        return (
            <div className="explore-overall-container">
                <div className="explore-gutter">
                    <div className="explore-discover-container">
                        <div className="discover-people">Discover People</div>
                        <div className="see-all">See All</div>
                    </div>
                    <div id="container" className="suggested-container">
                        <div id="overlay" className="suggested-overlay">
                            <div onClick={this.moveLeft} className="explore-left"/>
                            <div onClick={this.moveRight} className="explore-right"/>
                        </div>
                        {suggestions}
                    </div>
                    <div className="explore-media-overall-container">
                        <div className="explore-media-header">
                            <div className="header-explore-text">Explore</div>
                        </div>
                        <div className="explore-media-inner-container">
                            {explorePostList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        suggestedList: state.suggestedFollowsReducer.suggestedList,
        exploreMediaList: state.exploreMediaReducer.exploreMediaList,
    }
}

export default connect(mapStateToProps, {
    suggestedFollowsAction,
    exploreMediaAction,
})(AuthHOC(Explore));