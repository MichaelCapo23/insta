import React, {Component} from 'react';

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
                            <li className="no-styles options-li-unfollow">Unfollow</li>
                            <li onClick={this.hideModal} className="no-styles options-li-unfollow">Cancel</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default UnfollowModal;
