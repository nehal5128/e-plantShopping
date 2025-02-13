import { createSlice } from '@reduxjs/toolkit';
const initialState = {cartItems: []};
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingCartItem = state.items.find(item => item.name === name);
        if(existingCartItem) {
            existingCartItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }
        console.log("item added");
    },
    removeItem: (state, action) => {
        const existingCartItem = state.items.find(item => item.name === action.payload.name);
            if(existingCartItem.quantity === 1) {
                state.items = state.items.filter(item => item.name !== action.payload.name);
            } else {
                existingCartItem.quantity--;
            }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;

        const existingCartItem = state.items.find(item => item.name === name);
        if(existingCartItem) {
            
            existingCartItem.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
