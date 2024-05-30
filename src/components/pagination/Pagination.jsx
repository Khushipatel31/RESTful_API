import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrPage,
  getCurrPage,
  getPerPage,
  getUsersStatus,
  selectedAllUsers,
} from "../../store/slices/usersSlice";
import { toast } from "react-toastify";
const Pagination = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectedAllUsers);
  const perPage = useSelector(getPerPage);
  const currPage = useSelector(getCurrPage);
  const lastPage = users.length / perPage - 1;
  const usersStatus = useSelector(getUsersStatus);
  const changePerPage = (rows) => {
    dispatch(changeCurrPage({ page: 1, perPage: rows }));
  };
  const nextHandler = () => {
    if (users && currPage < lastPage) {
      dispatch(changeCurrPage({ page: currPage + 1, perPage: perPage }));
    }
  };
  const prevHandler = () => {
    if (users && currPage != 0) {
      dispatch(changeCurrPage({ page: currPage - 1, perPage: perPage }));
    }
  };
  return (
    <>
      <div>
        <select
          disabled={usersStatus === "loading"}
          value={perPage}
          onChange={(e) => changePerPage(Number(e.target.value))}
        >
          <option disabled>Rows Per Page</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button
          disabled={currPage == 0}
          className="text-white"
          onClick={prevHandler}
        >
          Previous
        </button>
        <button
          disabled={currPage > perPage}
          className="text-white"
          onClick={nextHandler}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
