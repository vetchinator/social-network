import React from "react";
import s from "./../Friends.module.css";

const Friend = (props) => {

  return (
    <div className={s.friend}>
      <div className={s.friendImg}></div>
      <p className={s.friendName}> {props.name }</p>
    </div>
  );
};

export default Friend;
