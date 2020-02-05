import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import UploadComponent from "./fineUploader";


class CreatePostModal extends Component {
    state = {
        isOpen: false,
        file : "",
        description: ''
    };

    hideModal = (e) => {
        if(e.target.classList[0] === 'createPostModal' || e.target.classList[0] === 'cancel-upload') {
            document.getElementById("createPostModal").classList.add("hide");
        }
    };

    openModal = () => {
        document.getElementById("createPostModal").classList.remove("hide");
    };

    submitMedia = () => {
        debugger;
        this.props.createdMediaFns(this.state.file[0], this.state.description)
    };

    handleFiles = files => {
        this.setState({
            file: files.base64,
            description: document.getElementById('post-desc').value,
        })
    };

    addMediaDesc = () => {
        this.setState({
            description: document.getElementById('post-desc').value,
        })
    };

    render() {
        return (
            <div onClick={this.hideModal} id={"createPostModal"} className={this.state.isOpen ? 'createPostModal col l12 m12 s12' : 'createPostModal hide col l12 m12 s12'}>
                <div className="create-modal-card-container">
                    <UploadComponent state={this.state} addMediaDescFns={this.addMediaDesc} handleFilesFns={this.handleFiles}/>
                    <div className="modal-footer">
                        <button className="cancel-upload">Cancel</button>
                        <button onClick={this.submitMedia} className="submit-upload">Upload</button>
                    </div>
                </div>
            </div>
        )
    }
}



export default withRouter(CreatePostModal);
