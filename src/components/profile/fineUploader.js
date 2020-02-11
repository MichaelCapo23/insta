import React, {Component, useRef} from 'react'
import ReactFileReader from 'react-file-reader';
import Select from 'react-select';

class UploadComponent extends Component {

    state = {
        selectedOption: [],
    };

    handleChange = selectedOption => {
        this.setState({
            selectedOption: selectedOption,
        });
        console.log(`Option selected:`, selectedOption);
    };

    render() {
        const { selectedOption } = this.state;
        let options = [
            { value: '1', label: 'mike' },
            { value: '2', label: 'shawn' },
            { value: '3', label: 'omer' },
        ];
        return(
            <div className="files">
                <ReactFileReader base64={true} multipleFiles={true} multiple="multiple" handleFiles={this.props.handleFilesFns}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>
                {this.props.state.file === '' ? <div className="no-img-selected-text">No Image Has Been Selected!</div> : <img className="preview-upload-img" src={this.props.state.file} frameBorder="0" height="400" width="50%" />}
                <div className={this.props.state.file == '' ? 'error-text' : 'hide'}></div>
                <div className="info-container">
                    <div className="settings-profile-content email-input">
                        <div className="create-post-field-name">Description: </div>
                        <textarea onChange={this.props.addMediaDescFns} id="post-desc" className="create-post-field-input"/>
                        <div className="select-container">
                            <label className="select-label" htmlFor="selectID">Tag Friends: </label>
                            <Select id="selectID" isMulti value={selectedOption} onChange={this.handleChange} options={options}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadComponent;