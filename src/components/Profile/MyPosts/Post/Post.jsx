import React from "react";
import s from "./Post.module.css";

const Post = () => {
  return (
    <div className={s.post}>
      <img
        src="https://www.iconsdb.com/icons/preview/orange/user-xxl.png"
        alt="logo"
      />
      <p>Some post </p>
    </div>
  );
};

export default Post;
