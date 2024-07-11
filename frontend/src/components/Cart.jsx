// Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../components/context/CartContext';
import { CartIcon, ClearCartIcon } from './Icons';

function CartItem({ product, addToCart, removeFromCart }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => removeFromCart(product)}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          -
        </button>
        <span className="mx-2">{product.quantity}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function Cart() {
  const { cart, clearCart, addToCart, removeFromCart } = useContext(CartContext);
  const totalProducts = cart.reduce((total, product) => total + product.quantity, 0);
  const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="bg-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <button
          onClick={clearCart}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ClearCartIcon className="w-5 h-5 mr-2" />
          Clear Cart
        </button>
      </div>
      <div className="space-y-4">
        {cart.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <div className="mt-6 border-t border-gray-300 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 font-semibold">Total Products: {totalProducts}</span>
          
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-semibold">Total Amount: ${totalAmount.toFixed(2)}</span>
          <button
          onClick=''
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          
          Comprar
        </button>
        </div>
        
        

      </div>
    </div>
  );
}