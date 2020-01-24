import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class ProfileOptionsModal extends Component {
    state = {
        isOpen: false
    };

    hideModal = (e) => {
        if(e.target.classList[0] === 'profileOptionsModal') {
            document.getElementById("profileOptionsModal").classList.add("hide");
        }
    };

    hideModalAlways = () => {
        document.getElementById("profileOptionsModal").classList.add("hide");
    };

    openModal = () => {
        document.getElementById("profileOptionsModal").classList.remove("hide");
    };

    changePassword = () => {
        this.props.history.push('/settings#password')
    };

    logout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/signin')
    };

    openCreatePostModal = () => {
        document.getElementById("profileOptionsModal").classList.add("hide");
        document.getElementById('createPostModal').classList.remove('hide');
    }

    render() {
        return (
            <div onClick={this.hideModal} id={"profileOptionsModal"} className={this.state.isOpen ? 'profileOptionsModal col l12 m12 s12' : 'profileOptionsModal hide col l12 m12 s12'}>
                <div className="profile-modal-content center-align">
                    <div className="options-list-container">
                        <ul className='option-ul'>
                            <li onClick={this.openCreatePostModal} className="no-styles profile-options-li">Create Post!</li>
                            <li onClick={this.changePassword} className="no-styles profile-options-li">Change Password</li>
                            <li onClick={this.logout} className="no-styles profile-options-li">Logout</li>
                            <li onClick={this.hideModalAlways} className="no-styles profile-options-li">Cancel</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfileOptionsModal);
