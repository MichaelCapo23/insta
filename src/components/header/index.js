import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    state = {

    };

    searchInput = () => {
        if(this.input.current.value === '') {
            // this.input.current.style.backgroundImage = "url('search3.png')";
        } else {
            this.input.current.style.backgroundImage = "url('')";
        }
    };

    render() {
        return (
            <div className={'header-container'}>
                <div className="header-gutter">
                    <div className="asset-container">
                        <div className="logo-container"></div>
                        <div className="logo-divider"></div>
                        <div className="logo-text-container"></div>
                    </div>
                    <div className="searchbar-container">
                        <input ref={this.input} onChange={this.searchInput} placeholder={'search'} type="text" className="searchbar-input"></input>
                        {/*<span className='search-logo'></span>*/}
                        {/*<span className='search-text'>search</span>*/}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapStateToProps)(Header);