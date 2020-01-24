import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import FineUploader from 'fine-uploader'

class CreatePostModal extends Component {
    state = {
        isOpen: false,
    };

    componentDidMount() {
        var uploader = new qq.FineUploader({
            element: document.getElementById("uploader")
        })
    }

    hideModal = (e) => {
        if(e.target.classList[0] === 'createPostModal') {
            document.getElementById("createPostModal").classList.add("hide");
        }
    };

    openModal = () => {
        document.getElementById("createPostModal").classList.remove("hide");
    };

    submitMedia = () => {
        console.log('here');
    };


    render() {
        return (
            <div onClick={this.hideModal} id={"createPostModal"} className={this.state.isOpen ? 'createPostModal col l12 m12 s12' : 'createPostModal hide col l12 m12 s12'}>
                <div className="profile-modal-content center-align">
                    <div className="create-modal-card-container">

                    </div>
                </div>
            </div>
        )
    }
}



export default withRouter(CreatePostModal);
