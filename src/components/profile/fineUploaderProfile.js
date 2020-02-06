import React, {Component} from 'react'
import ReactFileReader from 'react-file-reader';

class UploadProfilePicComponent extends Component {

    render() {
        return(
            <div className="files">
                <ReactFileReader base64={true} multipleFiles={true} multiple="multiple" handleFiles={this.props.handleFilesFns}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>
                <img className="preview-upload-img" src={this.props.state.file === '' ? '' : this.props.state.file} frameBorder="0" height="400" width="50%" />
            </div>
        )
    }
}

export default UploadProfilePicComponent;