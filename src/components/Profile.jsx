import React from "react";
import s from './Profile.module.css'

const Profile = () => {
  return (
    <div className={s.profile}>
      <img
        src="https://www.searchenginejournal.com/wp-content/uploads/2018/10/How-to-Boost-Your-Images%E2%80%99-Visibility-on-Google-Images-760x400.png"
        alt=""
      />

      <div>profile</div>
      <div>My posts</div>
      <div>New post</div>
      <div>Post</div>
      <div>Post</div>
    </div>
  );
};

export default Profile;
