import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import filterReducer from "../redux/features/Course/filterSlice";
import courseReducer from "./features/Course/CourseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    filter: filterReducer,
  },
});
