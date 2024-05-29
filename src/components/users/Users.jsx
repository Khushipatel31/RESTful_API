import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectedAllUsers,
  getUsersStatus,
  getUsersError,
  getUsers,
} from "../../store/slices/usersSlice";
import Search from "../search/Search";
import User from "./User";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectedAllUsers);
  const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);
  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  if (usersStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (usersStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-[#0f172a] mt-0 mb-0  ">
        <Search />
        <div className="gap-5   m-4 grid grid-flow-row grid-cols-4 ">
          {users &&
            users.map((user) => {
              return <User user={user} />;
            })}
        </div>
        {/* <Pagination numOfButtons={users.length / 10} /> */}
      </div>
    </>
  );
};

export default Users;
