// components/ShoppingCartIcon.tsx
import React, { useContext } from 'react';
import { CartContext } from '@context/CartContext';
import ShoppingCartSvg from '@svg/shopping-cart.svg';

const ShoppingCartIcon: React.FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="flex items-center ml-3">
      <button
        className="bg-emerald-600 text-white px-4 py-2 flex"
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
      {cart.length > 0 && (
      <span className='ml-1'>{cart.length}</span>
      )}
      </button>
    </div>
  );
};

export default ShoppingCartIcon;
