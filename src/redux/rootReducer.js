import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import movieReducer from "./movieReducer";
export const store = configureStore({
    reducer: {
        message: messageReducer,
        auth: authReducer,
        movie: movieReducer,
    },
});
