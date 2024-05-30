import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectedAllUsers,
  getUsersStatus,
  getUsersError,
  getCurrPage,
  getPerPage,
  getKey,
} from "../../store/slices/usersSlice";
import Search from "../search/Search";
import User from "./User";
import Pagination from "../pagination/Pagination";

const Users = () => {
  const key = useSelector(getKey);
  const dispatch = useDispatch();
  const users = useSelector(selectedAllUsers);
  const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);
  const perPage = useSelector(getPerPage);
  const currPage = useSelector(getCurrPage);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  const paginatedUsers = useMemo(() => {
    const start = currPage * perPage;
    const end = start + perPage;
    let filteredUsers = users;
    if (users && users.length > 0 && key && key !== "") {
      filteredUsers = users.filter((user) => {
        return user?.firstName?.toLowerCase().includes(key.toLowerCase());
      });
    }
    return filteredUsers.slice(start, end);
  }, [users, perPage, currPage, key]);

  if (usersStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (usersStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#0f172a] mt-0 mb-0 h-[100rem]">
      <Search />
      <div className="gap-5 m-4 grid grid-flow-row grid-cols-4">
        {paginatedUsers.map((user) => (
          <span key={user.id}>
            <User user={user} />
          </span>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Users;
