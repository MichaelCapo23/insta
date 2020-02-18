import React, {Component, Fragment} from 'react';
import AuthHOC from '../../HOC/authHOC'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Notifications from '../notifications/';
import {createFollowAction} from '../../actions/createFollowAction'
import {createNotificationAction} from '../../actions/createNotificationAction';
import {searchBarAction} from '../../actions/searchBarAction';
import SearchBarModal from './searchBarModal'

class Header extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    state = {
        searchBarResults: '',
        searchBarStatus: false,
    };

    componentDidUpdate(prevProps) {

    }

    fillSearchBarModal = () => {
        let searchBarResultsList = this.props.searchBarResults.map((item, index) => {
            return (
                <SearchBarModal searchResult={item} key={index} images={{mediaImages:this.props.mediaImages,profileImages:this.props.profileImages,generalImages:this.props.generalImages}}/>
            )
        });
        return searchBarResultsList;
    };

    createEmptySearchBar = () => {
        let searchBarResultsList = <div className="emptySearchBar">No results found.</div>;
        return searchBarResultsList;
    }

    searchInput = () => {
        let searchVal = this.input.current.value;
        if(searchVal === '') {
            this.closeSearchBarModal();
            this.input.current.style.backgroundImage = `url(${this.props.generalImages['search3.png']})`;
        } else {
            this.openSearchBaModal();
            this.props.searchBarAction(this.props.id, searchVal);
            this.input.current.style.backgroundImage = "url('')";
        }
    };

    closeModal = (e) => {
        if(e.target.classList[0] === 'notifications-overall-container') {
            document.getElementById('notificationsModal').classList.add("hide");
            this.setState({
                searchBarStatus: false,
            })
        }
    };

    closeSearchBarModal = (e) => {
        if(e && e.target.classList[0] === 'searchbar-modal-overall-container') {
            this.setState({
                searchBarStatus: false,
            })
        } else {
            this.setState({
                searchBarStatus: false,
            })
        }
    };

    openNotifications = (e) => {
        document.getElementById('notificationsModal').classList.remove("hide");
    };

    openSearchBaModal = () => {
        this.setState({
            searchBarStatus: true,
        })
    };

    makeNotificationsList = () => {
        let notificationsList = this.props.notification_list.map((item, index) => {
            return <Notifications followFns={this.followUser} notifications={item} key={index} images={{mediaImages:this.props.mediaImages,profileImages:this.props.profileImages,generalImages:this.props.generalImages}}/>
        });
        return notificationsList
    };

    followUser = (followid) => {
        this.props.createFollowAction(this.props.id, followid);
        this.props.createNotificationAction(this.props.id, followid, 'follow', '-1');
    };

    render() {
        let notificationsList = '';
        let searchBarResultsList = '';
        if(this.props.notification_list !== '') {
            notificationsList = this.makeNotificationsList();
        }

        if(this.props.searchBarResults !== '' && this.input.current.value !== '' && this.state.searchBarStatus) {
            searchBarResultsList = this.fillSearchBarModal();
        } else {
            searchBarResultsList = this.createEmptySearchBar();
        }


        return (
            <Fragment>
                <div onClick={this.closeModal} className={'header-container'}>
                    <div className="header-gutter">
                        <Link to='/' className="asset-container">
                            <div className="logo-container"></div>
                            <div className="logo-divider"></div>
                            <div className="logo-text-container"></div>
                        </Link>
                        <div className="searchbar-overall-input-container">
                            <div className="searchbar-container">
                                <input ref={this.input} onChange={this.searchInput} placeholder={'Search'} type="text" className="searchbar-input"/>
                            </div>
                        </div>
                        <div className="header-icons-container">
                            <Link to={{pathname: '/explore', state: {id: this.props.id}}} className="header-compass-container">
                                <svg aria-label="Find People" className="_8-yf5 " fill="#262626" height="24"
                                     viewBox="0 0 48 48" width="24">
                                    <path clipRule="evenodd"
                                          d="M24 .5C37 .5 47.5 11 47.5 24S37 47.5 24 47.5.5 37 .5 24 11 .5 24 .5zm0 44c11.3 0 20.5-9.2 20.5-20.5S35.3 3.5 24 3.5 3.5 12.7 3.5 24 12.7 44.5 24 44.5zm-4.4-23.7c.3-.5.7-.9 1.2-1.2l14.8-8.1c.3-.1.6-.1.8.1.2.2.3.5.1.8l-8.1 14.8c-.3.5-.7.9-1.2 1.2l-14.8 8.1c-.3.1-.6.1-.8-.1-.2-.2-.3-.5-.1-.8l8.1-14.8zm6.2 5l4.3-7.8-7.8 4.3 3.5 3.5z"
                                          fillRule="evenodd"></path>
                                </svg>
                            </Link>
                            <div onClick={this.openNotifications} className="header-heart-container">
                                <svg aria-label="Activity Feed" className="_8-yf5 " fill="#262626" height="24"
                                     viewBox="0 0 48 48" width="24">
                                    <path clipRule="evenodd"
                                          d="M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z"
                                          fillRule="evenodd"></path>
                                </svg>
                            </div>
                            <Link to='/profile' className="header-profile-container">
                                <svg aria-label="Profile" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48"
                                     width="24">
                                    <path
                                        d="M24 27c-7.1 0-12.9-5.8-12.9-12.9s5.8-13 12.9-13c7.1 0 12.9 5.8 12.9 12.9S31.1 27 24 27zm0-22.9c-5.5 0-9.9 4.5-9.9 9.9s4.4 10 9.9 10 9.9-4.5 9.9-9.9-4.4-10-9.9-10zm20 42.8c-.8 0-1.5-.7-1.5-1.5V42c0-5-4-9-9-9h-19c-5 0-9 4-9 9v3.4c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V42c0-6.6 5.4-12 12-12h19c6.6 0 12 5.4 12 12v3.4c0 .8-.7 1.5-1.5 1.5z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div onClick={this.closeSearchBarModal} id="searchBarModal" className={this.state.searchBarStatus ? "searchbar-modal-overall-container" : "searchbar-modal-overall-container hide"}>
                    <div className="searchbar-gutter">
                        <div className="searchbar-point"/>
                        <div className="searchbar-content">
                            {searchBarResultsList}
                        </div>
                    </div>
                </div>
                <div onClick={this.closeModal} id="notificationsModal" className="notifications-overall-container hide">
                    <div className="notifications-gutter">
                        <div className="notification-point"></div>
                        <div className="notifications-content">
                            {notificationsList}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchBarResults: state.searchBarReducer.searchBarResults,
    }
}

export default connect(mapStateToProps, {
    createFollowAction,
    createNotificationAction,
    searchBarAction,
})(AuthHOC(Header));