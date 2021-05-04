import React from "react";
import s from "./Post.module.css";
import logo from '../../../../images/user.png';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Post = (props) => {

    const toggleClass =  () => {
            let isliked = props.post.isLiked;
            let countLike = props.post.countLike;
            isliked ? --countLike : ++countLike;
            props.setLike(props.post.id, !isliked, countLike); 
    }

    return (
        <div className={s.post}>
            <div className={s.author}>
                <img src={ props.photo || logo } alt="logo" />
                <span>{props.fullName}</span>
            </div>
            
            <div className={s.comment}>
                <div className={s.message}>{props.post.message}</div>
                <div className={s.likeWrapper} > 
                    {props.post.countLike}
                    <FavoriteIcon className={props.post.isLiked ? s.ico + ' ' + s.liked : s.ico} onClick={toggleClass} />
                </div>
            </div>
        </div>
    );
};

export default Post;
