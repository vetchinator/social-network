import React from "react";
import s from "./Users.module.css";

const Users = (props) => {
    
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                followed: true,
                avatarSrc:
                    "https://smashinglogo.com/static/img/virtual-designers/peter.gif",
                fullName: "Aleksej Smirnov",
                location: { country: "Russia", city: "Kursk" },
            },
            {
                id: 2,
                followed: false,
                avatarSrc:
                    "https://smashinglogo.com/static/img/virtual-designers/peter.gif",
                fullName: "Nastya Sokolova",
                location: { country: "Russia", city: "Moskow" },
            },
            {
                id: 3,
                followed: true,
                avatarSrc:
                    "https://smashinglogo.com/static/img/virtual-designers/peter.gif",
                fullName: "Evgenij Starkov",
                location: { country: "Russia", city: "Volgograd" },
            },
            {
                id: 4,
                followed: true,
                avatarSrc:
                    "https://smashinglogo.com/static/img/virtual-designers/peter.gif",
                fullName: "Sasha Alekseev",
                location: { country: "Russia", city: "Kazan" },
            },
            {
                id: 5,
                followed: false,
                avatarSrc:
                    "https://smashinglogo.com/static/img/virtual-designers/peter.gif",
                fullName: "Sveta Pupova",
                location: { country: "Russia", city: "Belgorod" },
            },
            {
                id: 6,
                followed: false,
                avatarSrc:
                    "https://smashinglogo.com/static/img/virtual-designers/peter.gif",
                fullName: "Stas Vetkin",
                location: { country: "USA", city: "New York" },
            },
        ]);
    }


    return (
        <div className={s.users}>
            {props.users.map((user) => (
                <div className={s.user} key={user.id}>
                    <div>
                        <img
                            className={s.avatar}
                            src={user.avatarSrc}
                            alt="avatar"
                        />
                    </div>
                    <div>{user.fullName}</div>
                    <div>{user.location.country}</div>
                    <div>{user.location.city}</div>
                    {user.followed ? (
                        <button
                            onClick={() => {
                                props.unfollow(user.id);
                            }}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                props.follow(user.id);
                            }}
                        >
                            Follow
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
    // <div className={s.users}>{usersElements}</div>;
};

export default Users;
