import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  let postElements = props.profilePage.posts.map((p) => (
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
          <button onClick={onAddPost}>Add Post</button>
        </div>
      </div>
      {postElements}
    </div>
  );
};

export default MyPosts;
