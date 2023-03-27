import { createSlice } from "@reduxjs/toolkit";

const userItem = localStorage.getItem("user");
const user = userItem && userItem !== "undefined" ? JSON.parse(userItem) : null;

const initialState = {
  isLoggedIn: user ? true : false,
  name: user ? user.name : "",
  user: {
    address: "",
    name: "",
    email: "",
    phone: "",
    bio: "",
    role: "",
    token: "",
    photo: "",
  },
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      state.name = user.name;
      state.user.token = user.token; // Also set the token to the user object
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.address = profile.address;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.user.token; // Add this line


export default authSlice.reducer;
