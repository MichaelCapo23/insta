import React, {Component, Fragment} from 'react';

class Landing extends Component {

    state = {
        data: null
    };

    render() {
        return (
            <Fragment>
                <div className={"content-header"}>
                    <div className="landing-gutter">
                        <div className="media-container">

                        </div>
                        <div className="information-container">

                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Landing;