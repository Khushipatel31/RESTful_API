import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    error: null,
    status: 'idle' // 'idle'|'loading'|'succeeded'|'failed'

};

const USERS_URL = "/users?limit=50";

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

export const { getUsers } = usersSlice.actions
export const selectedAllUsers = (state) => state.user.users;
export const getUsersStatus = (state) => state.user.status;
export const getUsersError = (state) => state.user.error;
export default usersSlice.reducer;
