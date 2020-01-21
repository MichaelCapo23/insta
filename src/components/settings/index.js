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
        console.log(this.props)
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
                                        <img className="profile-img" src={this.props.generalImages['default.png']} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.activeTab === 'password' ? 'active tab-pane settings-tab-content' :"tab-pane settings-tab-content"} id="POSTS">
                            <div className="settings-content-container">
                                <div className="profile-header-container">password</div>
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
