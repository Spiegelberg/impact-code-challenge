// context/CartContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

interface CartContextProps {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    // Check if the book is already in the cart
    const isBookInCart = cart.some((cartBook) => cartBook.id === book.id);

    if (!isBookInCart) {
      setCart((prevCart) => [...prevCart, book]);
    }
  };

  const removeFromCart = (bookId: string) => {
    console.log('Removing book with ID:', bookId);
    setCart((prevCart) => prevCart.filter((book) => book.id !== bookId));
    console.log('Updated Cart:', cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
