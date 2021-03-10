import React from "react";
import { addPostCreator, updateNewPostTextCreator } from "../../../redux/state";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let newPostElement = React.createRef();

  let addNewPost = () => {
    props.dispatch(addPostCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostTextCreator(text));
  };

  let postElements = props.posts.map((p) => (
    <Post message={p.message} countLike={p.likesCount} />
  ));

  return (
    <div>
      <h2 className={s.title}>My Posts</h2>
      <div className={s.newPost}>
        <div>
          <textarea
            ref={newPostElement}
            onChange={onPostChange}
            value={props.newPostText}
          ></textarea>
        </div>
        <div>
          <button onClick={addNewPost}>Add Post</button>
        </div>
      </div>
      {postElements}
    </div>
  );
};

export default MyPosts;
