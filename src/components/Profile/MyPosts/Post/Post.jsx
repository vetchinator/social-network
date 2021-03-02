import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.post}>
      <img
        src="https://www.iconsdb.com/icons/preview/orange/user-xxl.png"
        alt="logo"
      />
      <div className={s.comment}>
        <p>{props.message}</p>
        <p>like <span>{props.countLike}</span></p>
        
      </div>
    </div>
  );
};

export default Post;
