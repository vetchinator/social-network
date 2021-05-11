import React, { useState } from "react";
import s from "./Paginator.module.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

type PropTypes = {
    totalCountItems: number,
    pageSize: number,
    currentPage: number,
    portionSize?: number

    onPageChanged: (page: number) => void,
}

const Paginator: React.FC<PropTypes> = ({ totalCountItems, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
    let pageCount = Math.ceil(totalCountItems / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    if (window.innerWidth <= 550) {
        portionSize = 5;
    }
    let [portionNumber, setPortionNumber] = useState(1);
    let portionCount = Math.ceil(pageCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            <div className={s.arrow}>
                {portionNumber > 1 && (
                    <div
                        
                        onClick={() => {
                            setPortionNumber(portionNumber - 1);
                        }}
                    >
                        <ArrowBackIosIcon />
                    </div>
                )}
            </div>
            {pages
                .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map((page) => (
                    <span
                        key={page}
                        className={currentPage === page ? s.page + " " + s.selectedPage : s.page}
                        onClick={() => onPageChanged(page)}
                    >
                        {page}
                    </span>
                ))}
            <div className={s.arrow}>
                {portionCount > portionNumber && (
                    <div
                        
                        onClick={() => {
                            setPortionNumber(portionNumber + 1);
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Paginator;