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
        if(existingCartItem) 
        {
            //existingCartItem.quantity++;
            state.items = state.items.map((item) =>
            item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
        } else 
        {
            //state.items.push({ name, image, cost, quantity: 1 });
            state.items = [...state.items, { name, image, cost, quantity: 1 }];
        }
        console.log("Item added:", state.items);
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload.name);   
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
