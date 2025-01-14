import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../modules/postSlice";
import userSlice from "../modules/userSlice";

const store = configureStore({
  reducer: {
    posts: postSlice,
    user: userSlice,
  },
});

export default store;
