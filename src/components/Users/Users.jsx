import React from "react";
import s from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from './User/User';
// import ReactPaginate from 'react-paginate';

const Users = (props) => {
    return (
        <div>
            {/* <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={props.totalCountUsers / props.pageSize}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={props.onPageChanged}
            containerClassName={s.pagination}
            activeClassName={s.active}
            initialPage={props.currentPage}
            /> */}
            <Paginator
                totalCountUsers={props.totalCountUsers}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
            />

            <div className={s.users}>
                {props.users.map((user) => (
                    <User key={user.id} user={user} unfollow={props.unfollow} follow={props.follow}
                    followingInProgress={props.followingInProgress} />
                ))}
            </div>
        </div>
    );
};

export default Users;
