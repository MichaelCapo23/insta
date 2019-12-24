import React, {Component} from 'react';
import {connect} from 'react-redux';
import {unfollowUserAction} from "../../actions/unfollowUserAction";

class UnfollowModal extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isOpen: false
    };

    hideModal = () => {
        document.getElementById("unfollowModal").classList.add("hide");
    };

    openModal = () => {
        document.getElementById("unfollowModal").classList.remove("hide");
    };

    unfollowUser = () => {
        debugger;
        //NEED TO ALSO GET this.props.userValues.posterID into props here don't have that yet
        this.props.unfollowUserAction({id: this.props.userValues.userid, unfollowID: this.props.userValues.posterID});
        document.getElementById("unfollowModal").classList.add("hide");
    };

    render() {
        console.log(this.props);
        return (
            <div onClick={this.hideModal} id={"unfollowModal"} className={this.state.isOpen ? 'unfollowModal col l12 m12 s12' : 'unfollowModal hide col l12 m12 s12'}>
                <div className="profile-modal-content center-align">
                    <div className="img-name-container">
                        <div className="unfollow-img-container">
                            <img className='unfollow-user-img' src={this.props.userValues.filename ? this.props.images[this.props.userValues.filename] : ''} alt="instagram unfollow image"/>
                        </div>
                    </div>
                    <div className="unfollow-username">Unfollow @{this.props.userValues.username ? this.props.userValues.username: ''}</div>
                    <div className="options-list-container">
                        <ul className='option-ul'>
                            <li onClick={this.unfollowUser} className="no-styles options-li-unfollow">Unfollow</li>
                            <li onClick={this.hideModal} className="no-styles options-li-unfollow">Cancel</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        unfollowID: state.unfollowUserReducer.unfollowID
    };
}

export default connect(mapStateToProps, {
    unfollowUserAction,
})(UnfollowModal);
