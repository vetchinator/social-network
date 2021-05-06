import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { useForm } from "react-hook-form";

const AddPostForm = (props) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        props.addPost(data.addPostText);
        e.target.reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea  type="text" name="addPostText" ref={register}></textarea>
            </div>
            <div>
                <button type="submit">Send post</button>
            </div>
        </form>
    );
};

const MyPosts = props => {
    let postElements = [...props.posts].reverse().map((p) => (
        <Post setLike={props.setLike} post={p} key={p.id} photo={props.photo} fullName={props.fullName} />
    ));

    return (
        <div>
            <h2 className={s.title}>My Posts</h2>
            <div className={s.newPost}>
                <div>
                    <AddPostForm addPost={props.addPost} />
                </div>
            </div>
            {postElements}
        </div>
    );
};

export default MyPosts;
