import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Landing extends Component {

    state = {
        data: null,
        images: null
    };

    componentDidMount() {
        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        }
        const images = importAll(require.context('../../assets/media', false, /\.(png|jpe?g|PNG)$/));
        this.setState({
            images: images
        }, ()=> {console.log(this.state.images)})
    }

    render() {
        return (
            <Fragment>
                <div className={"content-header"}>
                    <div className="landing-gutter">
                        <div className="media-container">

                        </div>
                        <div className="information-container">
                            <div className="landing-profile">
                                <div className="profile-pic-landing">
                                    <img className='user-profile' src={this.state.images ? this.state.images[this.props.fileName] : ''} alt=""/>
                                </div>
                                <div className="profile-info-landing">
                                    <div className="username-landing">mikeCapo23</div>{/*this.props.username*/}
                                    <div className="name-landing">mike capo</div>{/*{this.props.name}*/}
                                </div>
                            </div>
                            <div className="stories-container">
                                <div className="stories-header">
                                    <div className="stories-title">Stories</div>
                                    <div className="stories-watch-all">Watch all</div>
                                </div>
                                <div className="stories-container-inner">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


function mapStateToProps(state) {
    return {
        username: state.usernameReducer.username,
        name: state.usernameReducer.name,
        fileName: state.getUserMediaReducer.media.fileName,
    }
}
export default connect(mapStateToProps, {

})(withRouter(Landing));