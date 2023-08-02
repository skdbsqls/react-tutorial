import { createSlice } from "@reduxjs/toolkit";

const initialState = [{}];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
