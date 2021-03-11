import React from "react";
import Friend from "./Friend/Friend";
import s from "./Friends.module.css";

const Friends = (props) => {
    let friendsElements = props.friends.map((f) => <Friend name={f.name} />);

    return (
        <div className={s.friends}>
            <h3>Friends</h3>
            {friendsElements}
            {/* <Friend name='Andrew' />
      <Friend name='Sveta' />
      <Friend name='Aleksej' /> */}
        </div>
    );
};

export default Friends;
