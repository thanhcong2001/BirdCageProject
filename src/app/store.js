import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../componets/Auth/userSlice"
import productReducer from "componets/ProductCompare/productSlice.js";

const rootReducer = {
    user: userReducer,
    products: productReducer,
};

const store = configureStore({
    reducer: rootReducer,
})

export default store;