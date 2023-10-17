import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = (state) => state.cart.cartItems;

//Count number of products in the cart
export const cartItemsCountSelector = createSelector(
    cartItemsSelector,
    cartItems => cartItems.reduce((count, item) => count + item.quantity, 0));

// Cal total of cart items
export const cartTotalSelector = createSelector(
    cartItemsSelector,
    cartItems => cartItems.reduce((total, item) => total + item.salePrice * item.quantity, 0));