import { configureStore } from "@reduxjs/toolkit";
import test from "./features/test/testSlice";
import auth from "./features/auth/authSlice";

const store = configureStore({
    reducer: {
        // test: testSlice.reducer
        test: test,
        auth: auth,
    }
});


export default store;