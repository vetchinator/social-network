import React from "react";
import s from "./Users.module.css";
import * as axios from 'axios';
import userPhoto from './../../assets/images/user.png';

class Users extends React.Component {
    constructor(props) {
        super(props);
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then(response => {
            props.setUsers(response.data.items);
        })
    }
    
    render() {
        return (
            <div className={s.users}>
                {this.props.users.map((user) => (
                    <div className={s.user} key={user.id}>
                        <div>
                            <img
                                className={s.avatar}
                                src={user.photos.small ? user.photos.small : userPhoto}
                                alt="avatar"
                            />
                        </div>
                        <div>{user.name}</div>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
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
        );
    }
}

export default Users;
