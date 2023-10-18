import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     compareList: [],
// };

const productSlice = createSlice({
    name: 'products',
    initialState : {
        compareList: [],
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
    },
});

export const { addToCompare, removeFromCompare } = productSlice.actions;

export default productSlice.reducer;