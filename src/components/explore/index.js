import React, {Component} from 'react';
import AuthHOC from '../../HOC/authHOC';
import {suggestedFollowsAction} from '../../actions/suggestedFollowsAction'
import {connect} from 'react-redux';

class Explore extends Component {

    state = {
        discoverUsers: '',
        initalMethods: false,
        suggestedList: '',
    }

    componentWillMount() {
        if(this.props.id) {
            //call initial actions
            this.setState({
                initalMethods: true,
            })
        }
    }

    componentDidUpdate()  {
        if(this.props.id && this.state.discoverUsers === '' && !this.state.initalMethods) {
            //call initial actions
            this.props.suggestedFollowsAction(this.props.id);
            this.setState({
                initalMethods: true,
            })
        }

        if(this.props.suggestedList != this.state.suggestedList) {
            this.setState({
                suggestedList: this.props.suggestedList
            }, () => {console.log(this.state.suggestedList)})
        }
    }


    render() {
        return (
            <div className="explore-overall-container">
                <div className="explore-gutter">
                    <div className="explore-discover-container">
                        <div className="discover-people">Discover People</div>
                        <div className="see-all">See All</div>
                    </div>
                    <div className="suggested-container"></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        suggestedList: state.suggestedFollowsReducer.suggestedList
    }
}

export default connect(mapStateToProps, {
    suggestedFollowsAction,
})(AuthHOC(Explore));