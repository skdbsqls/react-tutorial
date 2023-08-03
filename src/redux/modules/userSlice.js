// 리덕스로 회원 정보 관리하기!!
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
