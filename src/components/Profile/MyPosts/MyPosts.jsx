import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postElements = props.posts.map((p) => (
    <Post message={p.message} countLike={p.likesCount} />
  ));

  return (
    <div>
      <h2 className={s.title}>My Posts</h2>
      <div className={s.newPost}>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add Post</button>
        </div>
      </div>
      {postElements}
    </div>
  );
};

export default MyPosts;
