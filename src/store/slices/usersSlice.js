import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    filtered: [],
    currPage: 0,
    perPage: 10,
    key: '',
    error: null,
    status: 'idle' // 'idle'|'loading'|'succeeded'|'failed'
};

const USERS_URL = "/users?limit=220";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await fetch(USERS_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        changeCurrPage(state, action) {
            state.currPage = action.payload.page,
                state.perPage = action.payload.perPage
        },
        changeKey(state, action) {
            state.key = action.payload.key,
                state.currPage = action.payload.curr
        },
        updateUsers(state, action) {
            state.filtered = action.payload.filteredUsers
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
            });
    },
});

export const { getUsers, changeCurrPage, changeKey, updateUsers } = usersSlice.actions
export const selectedAllUsers = (state) => state.user.users;
export const filteredUsers = (state) => state.user.filtered;

export const getUsersStatus = (state) => state.user.status;
export const getUsersError = (state) => state.user.error;
export const getCurrPage = (state) => state.user.currPage;
export const getPerPage = (state) => state.user.perPage;
export const getKey = (state) => state.user.key;
export default usersSlice.reducer;