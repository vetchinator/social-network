import React from "react";

import { connect } from "react-redux";
import { follow, unfollow, requestUsers } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from 'redux';
import {
    getUsers,
    getTotalCountUsers,
    getPageSize,
    getCurrentPage,
    getFollowingInProgress
} from '../../redux/users-selector';

class UsersAPIContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}

                <Users
                    users={this.props.users}
                    totalCountUsers={this.props.totalCountUsers}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalCountUsers: getTotalCountUsers(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose(
    connect(mapStateToProps, { follow, unfollow, requestUsers }),
)
(UsersAPIContainer);
