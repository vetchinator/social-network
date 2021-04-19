import React, { useState } from "react";
import s from "./Paginator.module.css";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Paginator = ({ totalCountUsers, pageSize, currentPage, onPageChanged, portionSize = 15 }) => {
    let pageCount = Math.ceil(totalCountUsers / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let [portionNumber, setPortionNumber] = useState(1);
    let portionCount = Math.ceil(pageCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;  

    return (
        <div>
            <div>
                {
                    portionNumber > 1 && 
                    <button onClick={()=> { setPortionNumber(portionNumber - 1) }}><ArrowBackIosIcon /></button>    
                }
                {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map((page) => (
                    <span
                        key={page}
                        className={currentPage === page ? s.selectedPage : ""}
                        onClick={() => onPageChanged(page)}
                    >
                        {page}
                    </span>
                ))}
                {
                    portionCount > portionNumber && 
                    <button onClick={()=> { setPortionNumber(portionNumber + 1)} }><ArrowForwardIosIcon /></button>    
                }
            </div>
        </div>
    );
};

export default Paginator;
