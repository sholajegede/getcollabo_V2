// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";


const Pagination = ({ className = "", totalInfluencers, numPerPage, paginate }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalInfluencers / numPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderItem = (number, index) => {
    if (index === 0) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
          href={`/page-search/${index}`}
        >
          {number}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <Link
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        to={`/page-search/${index}`}
      >
        {number}
      </Link>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {pageNumbers.map(renderItem)}
    </nav>
  );
};

export default Pagination;
