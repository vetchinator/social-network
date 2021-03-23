import React from "react";

import { connect } from "react-redux";
import {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toogleIsFetching,
    toogleFollowingProgress
} from '../../redux/users-reducer';
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { userAPI } from '../../api/api';

class UsersAPIContainer extends React.Component {
    componentDidMount() {
        this.props.toogleIsFetching(true);
        userAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then((data) => {
                this.props.toogleIsFetching(false);
                this.props.setUsers(data.items);
                if (data.totalCount > 800) {
                    data.totalCount = 800;
                }
                this.props.setTotalUsersCount(data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toogleIsFetching(true);
        userAPI.getUsers(pageNumber, this.props.pageSize)
            .then((data) => {
                this.props.toogleIsFetching(false);
                this.props.setUsers(data.items);
            });
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
                    toogleFollowingProgress={this.props.toogleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalCountUsers: state.usersPage.totalCountUsers,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
};

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toogleIsFetching,
    toogleFollowingProgress,
})(UsersAPIContainer);
