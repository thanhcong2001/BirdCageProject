import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     compareList: [],
// };

const productSlice = createSlice({
    name: 'products',
    initialState : {
        compareList: [],
        emailConfirm: null
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
        setEmail: (state, action) => {
            state.emailConfirm = action.payload
        },
        clearEmail: (state, action) => {
            state.emailConfirm = null
        }
    },
});

export const { addToCompare, removeFromCompare, setEmail, clearEmail } = productSlice.actions;

export default productSlice.reducer;