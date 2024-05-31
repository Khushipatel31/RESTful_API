import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrPage,
  getCurrPage,
  getPerPage,
  getUsersStatus,
  selectedAllUsers,
  filteredUsers,
} from "../../store/slices/usersSlice";
import { toast } from "react-toastify";
const Pagination = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectedAllUsers);
  const perPage = useSelector(getPerPage);
  const currPage = useSelector(getCurrPage);
  let lastPage = 0;
  if (users) {
    lastPage = parseInt(users.length / perPage) + 1;
  }

  const usersStatus = useSelector(getUsersStatus);

  const changePerPage = (rows) => {
      dispatch(changeCurrPage({ page: 0, perPage: rows }));
  };
  const nextHandler = () => {
    if (users && currPage + 1 < lastPage) {
      dispatch(changeCurrPage({ page: currPage + 1, perPage: perPage }));
    }
  };

  const prevHandler = () => {
    if (users && currPage != 0) {
      dispatch(changeCurrPage({ page: currPage - 1, perPage: perPage }));
    }
  };
  const firstPageHandler = () => {
    if (users) {
      dispatch(changeCurrPage({ page: 0, perPage: perPage }));
    }
  };
  const lastPageHandler = () => {
    if (users) {
      dispatch(changeCurrPage({ page: lastPage - 1, perPage: perPage }));
    }
  };
  return (
    <>
      {users.length > 0 && (
        <div className="w-full flex justify-center gap-4 my-9 py-7">
          <select
            disabled={usersStatus === "loading"}
            value={perPage}
            className="disabled:bg-red-500  p-2 rounded   w-40 mr-10 "
            onChange={(e) => changePerPage(Number(e.target.value))}
          >
            <option disabled>Rows Per Page</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <button
            onClick={firstPageHandler}
            className="text-white p-2  text-xl "
          >
            1
          </button>
          <button
            disabled={currPage == 0}
            className="text-white  text-xl p-2 "
            onClick={prevHandler}
          >
            {"<"}
          </button>

          {users && (
            <p className="text-white p-2 text-xl">
              {currPage + 1} of {lastPage == 0 ? 1 : lastPage}
            </p>
          )}
          <button
            disabled={currPage >= lastPage}
            className="text-white p-2  text-xl "
            onClick={nextHandler}
          >
            {">"}
          </button>
          <button
            onClick={lastPageHandler}
            className="text-white p-2  text-xl "
          >
            {lastPage}
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
