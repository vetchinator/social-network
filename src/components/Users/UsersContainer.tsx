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
    getFollowingInProgress,
    getIsFetching
} from '../../redux/users-selector';
import { UserType } from "../../types/types";
import { RootState } from "../../redux/redux-store";

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean, 
    totalCountUsers: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
}

type OwnPropsType = {}

type MapDispatchToPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
}

type PropType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersAPIContainer extends React.Component<PropType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
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

const mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        users: getUsers(state),
        totalCountUsers: getTotalCountUsers(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state),
        isFetching: getIsFetching(state)
    };
};
// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootState>(
        mapStateToProps,
        {follow, unfollow, requestUsers}
    )
)(UsersAPIContainer);
