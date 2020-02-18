import React, {Component} from 'react'
import ReactFileReader from 'react-file-reader';

class UploadProfilePicComponent extends Component {

    render() {
        return(
            <div className="files">
                <ReactFileReader base64={true} multipleFiles={true} multiple="multiple" handleFiles={this.props.handleFilesFns}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>
                {this.props.state.profileFile === '' ? <div className="no-img-selected-text">No Image Has Been Selected!</div> : <img className="preview-upload-img" src={this.props.state.profileFile} frameBorder="0" height="400" width="50%" />}
                <div className={this.props.state.profileFile == '' ? 'error-text' : 'hide'}/>
            </div>
        )
    }
}

export default UploadProfilePicComponent;