import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  users: [],
  filtered: [],
  currPage: 0,
  perPage: 10,
  key: "",
  error: null,
  status: "idle", // 'idle'|'loading'|'succeeded'|'failed'
};

const USERS_URL = "/users?limit=220";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch(USERS_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeCurrPage(state, action) {
      (state.currPage = action.payload.page),
        (state.perPage = action.payload.perPage);
    },
    filteringUsers(state, action) {
      state.users = state.filtered;
      if (action.payload.key && action.payload.key != "") {
        const key = action.payload.key.toLowerCase();
        state.users = state.users.filter((user) =>
          user.firstName.toLowerCase().includes(key)
        );
        state.key = action.payload.key;
      } else {
        state.users = state.filtered;
        state.key = "";
      }
      state.currPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.users = action.payload.users;
        state.filtered = action.payload.users;
      });
  },
});

export const { getUsers, changeCurrPage, filteringUsers } = usersSlice.actions;
export const selectedAllUsers = (state) => state.user.users;
export const filteredUsers = (state) => state.user.filtered;

export const getUsersStatus = (state) => state.user.status;
export const getUsersError = (state) => state.user.error;
export const getCurrPage = (state) => state.user.currPage;
export const getPerPage = (state) => state.user.perPage;
export const getKey = (state) => state.user.key;
export default usersSlice.reducer;
