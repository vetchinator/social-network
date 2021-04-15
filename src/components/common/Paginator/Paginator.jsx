import React from "react";
import s from "./Paginator.module.css";

const Paginator = ({ totalCountUsers, pageSize, currentPage, onPageChanged }) => {
    let pageCount = Math.ceil(totalCountUsers / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map((page) => (
                    <span
                        key={page}
                        className={currentPage === page ? s.selectedPage : ""}
                        onClick={() => onPageChanged(page)}
                    >
                        {page}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Paginator;
