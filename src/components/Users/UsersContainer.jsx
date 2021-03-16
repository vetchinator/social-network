import React from "react";
import * as axios from "axios";
import { connect } from "react-redux";
import {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toogleIsFetching,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersAPIContainer extends React.Component {
    componentDidMount() {
        this.props.toogleIsFetching(true);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
            )
            .then((response) => {
                this.props.toogleIsFetching(false);
                this.props.setUsers(response.data.items);
                if (response.data.totalCount > 100) {
                    response.data.totalCount = 100;
                }
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toogleIsFetching(true);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
            )
            .then((response) => {
                this.props.toogleIsFetching(false);
                this.props.setUsers(response.data.items);
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
    };
};

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toogleIsFetching,
})(UsersAPIContainer);
