import React, {Component} from 'react';
import changeProfileModal from './changeProfileModal'


class profilePicModal extends Component {
    state = {
        isOpen: false,
        profileFile : "",
        showDescription: false,
    };

    hideModal = (e) => {
        debugger;
        if(e.target.classList[0] === 'profilePicModal' || e.target.classList[0] === 'cancel-upload-profile-pic') {
            document.getElementById("profilePicModal").classList.add("hide");
        }
    };

    openModal = () => {
        document.getElementById("profilePicModal").classList.remove("hide");
    };

    handleFiles = files => {
        this.setState({
            profileFile: files.base64,
        })
    };

    openCreatePostModal = () => {
        document.getElementById("profilePicModal").classList.add("hide");
        document.getElementById('changeProfileModal').classList.remove('hide');
    };

    render() {
        return (
            <div onClick={this.hideModal} id={"profilePicModal"} className={this.state.isOpen ? 'profilePicModal col l12 m12 s12' : 'profilePicModal hide col l12 m12 s12'}>
                <div className="profile-modal-content center-align">
                    <div className="options-list-container">
                        <ul className='option-ul'>
                            <li onClick={this.openCreatePostModal} className="no-styles options-li">Upload Photo
                                {/*<input onChange={this.props.changeProfilePicFns} type="file"/>*/}
                            </li>
                            <li onClick={this.props.removeProfilePicFns} className="no-styles options-li">Remove Current Photo</li>
                            <li className="cancel-upload-profile-pic no-styles options-li">Cancel</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default profilePicModal;
