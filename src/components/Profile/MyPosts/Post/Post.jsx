import React from "react";
import s from "./Post.module.css";
import logo from '../../../../images/user.png';

const Post = (props) => {
    return (
        <div className={s.post}>
            <img src={ logo } alt="logo" />
            <div className={s.comment}>
                <p>{props.message}</p>
                <p>
                    like <span>{props.countLike}</span>
                </p>
            </div>
        </div>
    );
};

export default Post;
