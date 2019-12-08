import React, {Component, Fragment} from 'react';
import 'material-icons'

class Profile extends Component {

    state = {
        data: null,
        username: 'Mike_Capo23',
    };

    render() {
        return (
            <Fragment>
                <div className={"content-header"}>
                    <div className="profile-gutter">
                        <div className="user-info-container">
                            <div className="profile-pic-container">
                                <div className="profile-pic-container-inner"></div>
                            </div>
                            <div className="profile-info-container">
                                <div className="profile-info-content-container">
                                    <div className="information-container-top">
                                        <div className="profile-username">{this.state.username}</div>
                                        <div className="profile-edit">
                                            <button className={'btn-edit'} type={'button'}>Edit Profile</button>
                                            <div className={'cog-icon'}></div>
                                        </div>
                                    </div>
                                    <div className="information-container-middle">
                                        <div className="posts"></div>
                                        <div className="followers"></div>
                                        <div className="following"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Profile;