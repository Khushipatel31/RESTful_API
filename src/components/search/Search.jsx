import React from "react";

const Search = () => {
  return (
    <>
      <div className="flex justify-center m-0 p-4 container w-full">
        <input
          type="text"
          className="bg-[#34aae0] p-3 rounded-lg w-4/12 border border-[#34aae0] text-black text-lg active:bg-[#34aae0]  active:border-[#34aae0] hover:border-[#34aae0] hover:shadow-md hover:bg-[#34aae0]  m-3  "
          placeholder="Search..."
        ></input>

        <button
          class="bg-[#34aae0] p-3 text-xl font-bold w-1/12 rounded-lg m-3 hover:bg-[#1e8fc3] hover:shadow-md hover:shadow-black hover:text-white"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
