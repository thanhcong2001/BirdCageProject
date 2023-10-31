import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     compareList: [],
// };

const productSlice = createSlice({
    name: 'products',
    initialState : {
        compareList: [],
        emailConfirm: null,
        voucherCode: null,
        updateCartArr: []
    },
    reducers: {
        addToCompare: (state, action) => {
            state.compareList.push(action.payload);
        },
        removeFromCompare: (state, action) => {
            const index = state.compareList.findIndex(
                (product) => product.id === action.payload.id
            );
            if (index !== -1) {
                state.compareList.splice(index, 1);
            }
        },
        updateToCartArr: (state, action) => {
            const { productId, count } = action.payload;
            const existingItem = state.updateCartArr.find((item) => item.productId === productId);
          
            if (existingItem) {
              // If an item with the same productId exists, update its count
              existingItem.count = count;
            } else {
              // If not, add a new item to the array
              state.updateCartArr.push({ productId, count });
            }
          },
          clearProductWithId: (state, action) => {
            const idToRemove = action.payload;
            console.log(idToRemove)
            state.updateCartArr = state.updateCartArr.filter((product) => product.productId !== idToRemove);
          },
        setVoucherCode: (state, action) => {
            state.voucherCode = action.payload
        },
        clearVoucherCode: (state, action) => {
            state.voucherCode = null
        },
        setEmail: (state, action) => {
            state.emailConfirm = action.payload
        },
        clearEmail: (state, action) => {
            state.emailConfirm = null
        }
    },
});

export const { addToCompare, removeFromCompare, setEmail, clearEmail ,setVoucherCode, clearVoucherCode, updateToCartArr, clearProductWithId} = productSlice.actions;

export default productSlice.reducer;