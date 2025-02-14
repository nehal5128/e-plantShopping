import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
   return cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0);
  };

  const handleContinueShopping = (e) => {
     e.preventDefault(); // Check if event exists before calling preventDefault()
     onContinueShopping(e);
     console.log("Back to shop");
    };


  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
};


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
  if (item.quantity > 1) {
    dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 })); // Decrease quantity
  } else {
    dispatch(removeItem(item)); // Remove item if quantity is 0
  }
};


  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
 const calculateTotalCost = (item) => {
  return item.price * item.quantity;
};


const handleCheckoutShopping = () => {
    alert("Coming Soon: Functionality to be added in the future.");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3>Total Items: {calculateTotalQuantity()}</h3> {/* Display total quantity */}

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


