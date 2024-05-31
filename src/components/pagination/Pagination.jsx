import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrPage,
  getCurrPage,
  getPerPage,
  getUsersStatus,
  selectedAllUsers,
  updateUsers,
  filteredUsers
} from "../../store/slices/usersSlice";
import { toast } from "react-toastify";
const Pagination = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectedAllUsers);
  const perPage = useSelector(getPerPage);
  const currPage = useSelector(getCurrPage);
  let lastPage = 0;
  if (users) {
    lastPage = users.length / perPage - 1;
  }

  const usersStatus = useSelector(getUsersStatus);

  const changePerPage = (rows) => {
    if (!(users.length < perPage)) {
      dispatch(changeCurrPage({ page: 0, perPage: rows }));
    }
  };
  const nextHandler = () => {
    if (users && currPage + 1 <= lastPage) {
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
      <div className="w-full flex justify-center gap-4 my-9 py-7">
        <select
          disabled={usersStatus === "loading"}
          value={perPage}
          className="disabled:bg-red-500"
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
          className="text-white  text-xl "
          onClick={prevHandler}
        >
          Previous
        </button>

        {users && (
          <p className="text-white">
            {currPage + 1}of{parseInt(users.length / perPage)}
          </p>
        )}
        <button
          disabled={currPage > lastPage}
          className="text-white  text-xl "
          onClick={nextHandler}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
