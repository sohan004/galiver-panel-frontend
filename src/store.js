import { configureStore } from "@reduxjs/toolkit";
import test from "./features/test/testSlice";

const store = configureStore({
    reducer: {
        // test: testSlice.reducer
        test : test
    }
});


export default store;