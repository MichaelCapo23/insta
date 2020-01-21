import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHOC from '../../HOC/authHOC'
import {getSettingsUserDataAction} from "../../actions/getSettingsUserDataAction";
class Settings extends Component {
    state = {
        activeTab: 'profile',
        calledSettingsData: false,
    };

    changeTabs = (e) => {
        let id = e.target.attributes.id.value;
        this.setState({
            activeTab: id
        })
    };

    componentDidUpdate(prevProps) {
        if(this.props != prevProps) {
            if(this.props.id && !this.state.calledSettingsData) {
                this.setState({
                   calledSettingsData: true,
               }, () => {this.props.getSettingsUserDataAction(this.props.id)})
           }
        }
    }


    render() {
        return (
            <div className="settings-container">
                <div className="settings-gutter">
                    <div className="settings-card-container">
                        <ul className="nav nav-tabs settings-nav-tabs" data-toggle="tabs">
                            <li className={this.state.activeTab === 'profile' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} ref={this.posts} id="profile" className={"nav-tabs-font side-nav-profile"} href="#profile">Edit Profile</a></li>
                            <li className={this.state.activeTab === 'password' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="password" className={"nav-tabs-font side-nav-profile"} href="#password">Change Password</a></li>
                        </ul>
                        <div className={this.state.activeTab === 'profile' ? 'active tab-pane settings-tab-content' :"tab-pane settings-tab-content"} id="POSTS">
                            <div className="settings-content-container">
                                <div className="profile-header-container">
                                    <div className="profile-img-container">
                                        <img className="profile-img" src={this.props.settingsData ? this.props.settingsData.fileName !== 'default' ? this.props.profileImages[this.props.settingsData.fileName] : this.props.generalImages['default.png'] : this.props.generalImages['default.png']} alt=""/>
                                    </div>
                                    <div className="username-modal-btn-container">
                                        <div className="profile-header-profile-username">{this.props.username ? this.props.username : ''}</div>
                                        <div className="change-profile-img-btn">Change Profile Photo</div>
                                    </div>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Name</div>
                                    <input type="text" id="name" className="settings-profile-input"/>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Username</div>
                                    <input type="text" id="username" className="settings-profile-input"/>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Website</div>
                                    <input type="text" id="website" className="settings-profile-input"/>
                                </div>


                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label bio-label">Bio</div>
                                    <textarea type="text" id="bio" className="settings-profile-input bio-textarea"/>
                                </div>

                                <div className="private-info">Private Information</div>

                                <div className="settings-profile-content email-input">
                                    <div className="name-input-label settings-label">Email</div>
                                    <input type="text" id="email" className="settings-profile-input"/>
                                </div>


                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Phone Number</div>
                                    <input type="text" id="phone_number" className="settings-profile-input"/>
                                </div>

                                <div className="submit-btn-container">
                                    <button className="settings-profile-submit-btn">Submit</button>
                                </div>

                            </div>
                        </div>
                        <div className={this.state.activeTab === 'password' ? 'active tab-pane settings-tab-content' :"tab-pane settings-tab-content"} id="POSTS">
                            <div className="settings-content-container">
                                <div className="profile-header-container">
                                    <div className="profile-img-container">
                                        <img className="profile-img" src={this.props.settingsData ? this.props.settingsData.fileName !== 'default' ? this.props.profileImages[this.props.settingsData.fileName] : this.props.generalImages['default.png'] : this.props.generalImages['default.png']} alt=""/>
                                    </div>
                                    <div className="profile-header-username">{this.props.username ? this.props.username : ''}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className={"profile-footer-container"}>
                        <div className="signup-link-container">
                            <ul className={'signup-link-ul'}>
                                <li className={"signup-link"}>ABOUT US</li>
                                <li className={"signup-link"}>SUPPORT</li>
                                <li className={"signup-link"}>PRESS</li>
                                <li className={"signup-link"}>API</li>
                                <li className={"signup-link"}>JOBS</li>
                                <li className={"signup-link"}>PRIVACY</li>
                                <li className={"signup-link"}>TERMS</li>
                                <li className={"signup-link"}>DIRECTOR</li>
                                <li className={"signup-link"}>PROFILES</li>
                                <li className={"signup-link"}>HASHTAGS</li>
                                <li className={"signup-link"}>LANGUAGE</li>
                            </ul>
                            <span className={'signup-copyright'}>© 2020 INSTAGRAM FROM MICHAEL</span>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        settingsData: state.getSettingsUserDataReducer.settingsInfo,
    }
}

export default connect(mapStateToProps, {
    getSettingsUserDataAction,
})(AuthHOC(Settings));
