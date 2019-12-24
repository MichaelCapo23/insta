import React, {Component} from 'react';

class OptionsModal extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isOpen: false
    };

    hideModal = () => {
        document.getElementById("optionsModal").classList.add("hide");
    };

    openModal = () => {
        document.getElementById("optionsModal").classList.remove("hide");
    };

    render() {
        console.log(this.props);
        return (
            <div onClick={this.hideModal} id={"optionsModal"} className={this.state.isOpen ? 'optionsModal col l12 m12 s12' : 'optionsModal hide col l12 m12 s12'}>
                <div className="profile-modal-content center-align">
                    <div className="options-list-container">
                        <ul className='option-ul'>
                            <li className="no-styles options-li">Report Inappropriate</li>
                            <li onClick={this.props.openUnfollowModal} className="no-styles options-li">Unfollow</li>
                            <li className="no-styles options-li">Go To Post</li>
                            <li className="no-styles options-li">Share</li>
                            <li className="no-styles options-li">Copy Link</li>
                            <li className="no-styles options-li">Embed</li>
                            <li className="no-styles options-li">Cancel</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default OptionsModal;
