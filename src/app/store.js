import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../componets/Auth/userSlice"
import productReducer from "componets/ProductCompare/productSlice.js";
import cartReducer from "componets/Cart/cartSlice.js";

const rootReducer = {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
};

const store = configureStore({
    reducer: rootReducer,
})

export default store;