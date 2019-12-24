import React, {Component} from 'react';
import './errormodal.css';

class MediaModal extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isOpen: false
    };


    hideModal = () => {
        document.getElementById("errorModal").classList.add("hide");
    };

    openModal = () => {
        document.getElementById("errorModal").classList.remove("hide");
    }

    render() {
        console.log(this.props);
        return (
            <div id={"MediaModal"} className={this.state.isOpen ? 'MediaModal col l12 m12 s12' : 'MediaModal hide col l12 m12 s12'}>
                <div className="profile-modal-content center-align">
                    <p className="errorTitle">Error posting book</p>
                    <button className="okayButton s12 offset-s5 btn green" onClick={this.hideModal}>okay</button>
                </div>
            </div>
        )
    }
}

export default MediaModal;
