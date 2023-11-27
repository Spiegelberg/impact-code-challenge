// components/BookCard.tsx
import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { CartContext } from '@context/CartContext';

interface BookCardProps {
  book: {
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
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const isBookInCart = cart.some((cartBook) => cartBook.id === book.id);

  const handleToggleCart = () => {
    if (isBookInCart) {
      removeFromCart(book.id);
    } else {
      addToCart(book);
    }
  };

  return (
    <figure key={book.id} className="md:flex  p-8 md:p-0 ">
      <div className='relative w-full'>
      {book.volumeInfo.imageLinks && (
        <Image 
          className="book-card-image w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto drop-shadow-special" 
          src={book.volumeInfo.imageLinks.thumbnail}
          alt=""
          fill={true}
          
          />
      )}
    </div>
    <div className="md:p-8 text-center md:text-left space-y-4">
      <h2 className="text-xl font-semibold mb-2">
        <Link className="text-black-500 hover:underline" href={`/books/${book.id}`}>
          {book.volumeInfo.title}
        </Link>
      </h2>
      {book.volumeInfo.description && (
        <blockquote>
          <p className="text-md font-normal">
          {book.volumeInfo.description.length > 200 ? (
            <>
              {book.volumeInfo.description.slice(0, 200)}...
              <Link className=" underline ml-1" href={`/books/${book.id}`}>
                Read More
              </Link>
            </>
          ) : (
            book.volumeInfo.description
          )}
          </p>
        </blockquote>
      )}
      <figcaption className="font-medium">
        <div className="font-bold ">
        {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
        </div>
        <div className="font-light text-slate-300 dark:text-slate-400">
        {book.volumeInfo.publisher} | {book.volumeInfo.publishedDate} | {book.volumeInfo.pageCount} pages
        </div>
      </figcaption>
      <button
          onClick={handleToggleCart}
          className={`px-4 py-2 rounded mt-3 ${
            isBookInCart ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {isBookInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
    </div>
  </figure>
  );
};

export default BookCard;
