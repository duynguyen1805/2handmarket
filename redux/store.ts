import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./example/example_redux";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});
