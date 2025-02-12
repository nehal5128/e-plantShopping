import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingCartItem = state.cartItems.find(item => item.id === action.payload.id);
        if(existingCartItem) {
            existingCartItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }
    },
    removeItem: (state, action) => {
        const existingCartItem = state.cartItems.find(item => item.id === action.payload.id);
            if(existingCartItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            } else {
                existingCartItem.quantity--;
            }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;

        const existingCartItem = state.cartItems.find(item => item.id === action.payload.id);
        if(existingCartItem) {
            
            existingCartItem.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
