import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHOC from '../../HOC/authHOC'
import {getSettingsUserDataAction} from "../../actions/getSettingsUserDataAction";
import {updateSettingsAction} from '../../actions/updateSettingsAction';
import {updatePasswordAction} from '../../actions/updatePasswordAction';
class Settings extends Component {
    state = {
        activeTab: 'profile',
        calledSettingsData: false,
        settingsData: '',
        updatedSettingsRows: 0,
        updatedPasswordRows: 0,
    };

    componentDidMount() {
        let url = window.location.href;
        let tabSwitchIndex = url.lastIndexOf('#');
        if(tabSwitchIndex != -1) {
            let tabSwitch = url.substring(tabSwitchIndex + 1, url.length);
            this.setState({
                activeTab: tabSwitch,
            })
        }
    }

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

            if(this.props.settingsData != this.state.settingsData) {
                this.setState({
                    settingsData: this.props.settingsData
                })
            }

            if(this.props.updatedSettingsRows != this.state.updatedSettingsRows) {
                if(Number(this.props.updatedSettingsRows) > 0) {
                    this.setState({
                        updatedSettingsRows: this.props.updatedSettingsRows
                    });
                    this.props.getSettingsUserDataAction(this.props.id);
                    document.getElementsByClassName('profile-changed-confirmation')[0].classList.remove('hide');
                    setTimeout(function(){ document.getElementsByClassName('profile-changed-confirmation')[0].classList.add('hide'); }, 7000);
                }
            }

            if(this.props.updatedPasswordRows != this.state.updatedPasswordRows) {
                if(Number(this.props.updatedPasswordRows) > 0) {
                    this.setState({
                        updatedPasswordRows: this.props.updatedPasswordRows
                    });
                    this.props.getSettingsUserDataAction(this.props.id);
                    document.getElementsByClassName('password-changed-confirmation')[0].classList.remove('hide');
                    setTimeout(function(){ document.getElementsByClassName('password-changed-confirmation')[0].classList.add('hide'); }, 7000);
                }
            }
        }


        console.log(this.props);

    }

    updateSettings = () => {
        let valuesArr = {};
        let selector = document.getElementsByClassName('settings-profile-input profile');
        for(let  i = 0; i <  selector.length; i++) {
            if(selector[i].attributes['data-old'].textContent != selector[i].value) {
                valuesArr[selector[i].attributes.name.textContent] = selector[i].value;
            }
        }
        this.props.updateSettingsAction(valuesArr, this.props.id);
    };

    updatePassword = () => {
        if(document.getElementsByClassName('settings-profile-input password-old')[0].value !== document.getElementsByClassName('settings-profile-input password-new')[0].value) {
            if(document.getElementsByClassName('settings-profile-input password-new')[0].value === document.getElementsByClassName('settings-profile-input password-confirm')[0].value) {
                this.props.updatePasswordAction(document.getElementsByClassName('settings-profile-input password-new')[0].value, this.props.id);
            }
        }
    };


    render() {
        return (
            <div className="settings-container">
                <div className="settings-gutter">
                    <div className="settings-card-container">
                        <ul className="nav nav-tabs settings-nav-tabs" data-toggle="tabs">
                            <li className={this.state.activeTab === 'profile' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} ref={this.posts} id="profile" className={"nav-tabs-font side-nav-profile"} href="#profile">Edit Profile</a></li>
                            <li className={this.state.activeTab === 'password' ? 'active tab-pane' :"tab-pane"}><a onClick={this.changeTabs} id="password" className={"nav-tabs-font side-nav-profile"} href="#password">Change Password</a></li>
                        </ul>
                        <div className={this.state.activeTab === 'profile' ? 'active tab-pane settings-tab-content' :"tab-pane settings-tab-content"} id="profile">
                            <div className="settings-content-container">
                                <div className="profile-header-container">
                                    <div className="profile-img-container">
                                        <img className="profile-img" src={this.props.settingsData ? this.props.settingsData.fileName !== 'default' ? this.props.profileImages[this.props.settingsData.fileName] : this.props.generalImages['default.png'] : this.props.generalImages['default.png']} alt=""/>
                                    </div>
                                    <div className="username-modal-btn-container">
                                        <div className="profile-header-profile-username">{this.props.username ? this.props.username : ''}</div>
                                        <div className="change-profile-img-btn">Change Profile Photo</div>
                                        <div className="profile-changed-confirmation hide">Profile Updated!</div>
                                    </div>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Name</div>
                                    <input data-old={this.props.name ? this.props.name : ''} name="name" defaultValue={this.props.name ? this.props.name : ''} type="text" id="name" className="settings-profile-input profile"/>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Username</div>
                                    <input data-old={this.props.username ? this.props.username : ''} name="username" defaultValue={this.props.username ? this.props.username : ''} type="text" id="username" className="settings-profile-input profile"/>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Website</div>
                                    <input data-old={this.props.settingsData ? this.props.settingsData.website : ''} name="website" defaultValue={this.props.settingsData ? this.props.settingsData.website : ''} type="text" id="website" className="settings-profile-input profile"/>
                                </div>


                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label bio-label">Bio</div>
                                    <textarea data-old={this.props.bio ? this.props.bio : ''} name="bio" defaultValue={this.props.bio ? this.props.bio : ''} type="text" id="bio" className="settings-profile-input bio-textarea profile"/>
                                </div>

                                <div className="private-info">Private Information</div>

                                <div className="settings-profile-content email-input">
                                    <div className="name-input-label settings-label">Email</div>
                                    <input data-old={this.props.name ? this.props.name : ''} name="name" defaultValue={this.props.name ? this.props.name : ''} type="text" id="email" className="settings-profile-input profile"/>
                                </div>


                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Phone Number</div>
                                    <input data-old={this.props.settingsData ? this.props.settingsData.phone_number : ''} name="phone_number" defaultValue={this.props.settingsData ? this.props.settingsData.phone_number : ''} type="text" id="phone_number" className="settings-profile-input profile"/>
                                </div>

                                <div className="submit-btn-container">
                                    <button onClick={this.updateSettings} className="settings-profile-submit-btn">Submit</button>
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
                                    <div className="password-changed-confirmation hide">Password Updated!</div>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Old Password</div>
                                    <input type="password" name="name" id="name" className="settings-profile-input password-old"/>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">New Password</div>
                                    <input type="password" name="name" id="name" className="settings-profile-input password-new"/>
                                </div>

                                <div className="settings-profile-content">
                                    <div className="name-input-label settings-label">Confirm New Password</div>
                                    <input type="password" name="name" id="name" className="settings-profile-input password-confirm"/>
                                </div>

                                <div className="submit-btn-container">
                                    <button onClick={this.updatePassword} className="settings-password-submit-btn">Change Password</button>
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
        updatedSettingsRows: state.updateSettingsReducer.updatedSettingsRows,
        updatedPasswordRows: state.updatePasswordReducer.updatedPasswordRows,
    }
}

export default connect(mapStateToProps, {
    getSettingsUserDataAction,
    updateSettingsAction,
    updatePasswordAction,
})(AuthHOC(Settings));
