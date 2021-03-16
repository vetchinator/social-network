import React from "react";
import s from "./Users.module.css";
import * as axios from 'axios';
import userPhoto from './../../assets/images/user.png';

class Users extends React.Component {
    componentDidMount() {
   
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setUsers(response.data.items);
                if(response.data.totalCount > 100) {
                    response.data.totalCount = 100  
                }
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then((response) => {
            this.props.setUsers(response.data.items);
        });
    }
    
    render() {

        let pageCount = Math.ceil(this.props.totalCountUsers / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div>
                    {pages.map((page) => (
                        <span
                            key={page}
                            className={this.props.currentPage === page? s.selectedPage: ""}
                            onClick={()=> this.onPageChanged(page)}
                        >
                            {page}
                        </span>
                    ))}
                </div>
                <div className={s.users}>
                    {this.props.users.map((user) => (
                        <div className={s.user} key={user.id}>
                            <div>
                                <img
                                    className={s.avatar}
                                    src={
                                        user.photos.small
                                            ? user.photos.small
                                            : userPhoto
                                    }
                                    alt="avatar"
                                />
                            </div>
                            <div>{user.name}</div>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                            {user.followed ? (
                                <button
                                    onClick={() => {
                                        this.props.unfollow(user.id);
                                    }}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        this.props.follow(user.id);
                                    }}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );

    }
}

export default Users;
