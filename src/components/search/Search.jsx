import React from "react";
import {
  
  filteringUsers,
  getKey,
  selectedAllUsers,
  
} from "../../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
const Search = () => {
  const dispatch = useDispatch();
  const searchKey = useSelector(getKey);
  const filterHandler = (e) => {
    dispatch(filteringUsers({ key: e.target.value }));
  };
  const clearHandler = () => {
    dispatch(filteringUsers({ key: "" }));
  };

  return (
    <>
      <div className="flex justify-center m-0 p-4 pt-5 container w-full">
        <input
          type="text"
          className="bg-[#34aae0] p-3 rounded-lg w-4/12 border border-[#34aae0] text-black text-lg active:bg-[#34aae0]  active:border-[#34aae0] hover:border-[#34aae0] hover:shadow-md hover:bg-[#34aae0]  m-3  "
          placeholder="Search by name"
          value={searchKey}
          onChange={filterHandler}
        ></input>
        <button
          className="bg-[#34aae0] p-3 text-xl font-bold w-1/12 rounded-lg m-3 hover:bg-[#1e8fc3] hover:shadow-md hover:shadow-black hover:text-white"
          onSubmit={filterHandler}
        >
          Search
        </button>
        <button
          className="bg-[#34aae0]  justify-end self-end p-3 text-red-600  text-xl font-bold w-1/12 rounded-lg m-3 hover:bg-[#1e8fc3] hover:shadow-md hover:shadow-black hover:text-white"
          onClick={clearHandler}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default Search;
