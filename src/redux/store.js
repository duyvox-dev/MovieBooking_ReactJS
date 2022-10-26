import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import movieReducer from "./movieReducer";
import miscReducer from "./miscReducer";
import checkoutReducer from "./checkoutReducer";
export const store = configureStore({
    reducer: {
        message: messageReducer,
        auth: authReducer,
        movie: movieReducer,
        misc: miscReducer,
        checkout: checkoutReducer,
    },
});
