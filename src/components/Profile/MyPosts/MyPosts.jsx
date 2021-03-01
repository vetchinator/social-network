import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div>
      <h2 className={s.title}>My Posts</h2>
      <div>
        <textarea></textarea>
        <button>Add Post</button>
        <button>Remove</button>
      </div>
      <Post />
      <Post />
    </div>
  );
};

export default MyPosts;
