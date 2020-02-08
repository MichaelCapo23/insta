import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import UploadProfilePicComponent from "./fineUploaderProfile";


class changeProfileModal extends Component {
    state = {
        isOpen: false,
        profileFile : "",
        description: '',
    };

    hideModal = (e) => {
        if(e.target.classList[0] === 'changeProfileModal' || e.target.classList[0] === 'cancel-upload') {
            document.getElementById("changeProfileModal").classList.add("hide");
        }
    };

    openModal = () => {
        document.getElementById("changeProfileModal").classList.remove("hide");
    };

    submitMedia = () => {
        debugger;
        this.props.changeProfileFns(this.state.profileFile[0])
    };

    handleFiles = files => {
        this.setState({
            profileFile: files.base64,
        })
    };

    render() {
        return (
            <div onClick={this.hideModal} id={"changeProfileModal"} className={this.state.isOpen ? 'changeProfileModal col l12 m12 s12' : 'changeProfileModal hide col l12 m12 s12'}>
                <div className="create-modal-card-container">
                    <UploadProfilePicComponent state={this.state} handleFilesFns={this.handleFiles}/>
                    <div className="modal-footer">
                        <button className="cancel-upload">Cancel</button>
                        <button onClick={this.submitMedia} className="submit-upload">Upload</button>
                    </div>
                </div>
            </div>
        )
    }
}



export default withRouter(changeProfileModal);
