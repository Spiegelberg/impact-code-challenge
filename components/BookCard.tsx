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
    saleInfo: {
      buyLink?: string;
      country?: string;
      isEbook?: boolean;
      listPrice?: {
        amount?: number;
        currencyCode?: string
      }
    }
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
      <div className='relative w-full h-auto'>
      {book.volumeInfo.imageLinks && (
        <Image 
          className="book-card-image md:rounded-none rounded-full mx-auto drop-shadow-special" 
          src={book.volumeInfo.imageLinks.thumbnail}
          alt=""
          fill={true}
          
          />
      )}
    </div>
    <div className="flex flex-col md:p-8 text-center md:text-left">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-semibold">
          <Link className="text-black-500 hover:underline" href={`/books/${book.id}`}>
            {book.volumeInfo.title}
          </Link>
        </h2>
        <span className="text-sm font-light text-slate-300 dark:text-slate-400">
          ({book.volumeInfo.pageCount} pages)
        </span>
      </div>
      <p className="font-light text-slate-300 dark:text-slate-400 mb-5">
        {book.volumeInfo.publisher} ({book.volumeInfo.publishedDate?.split('-')[0]})
        </p>
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
      <figcaption className="font-medium mt-1">
        <div className="font-bold">
        {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
        </div>
      </figcaption>
      { book.saleInfo.listPrice?.amount && (
        <div className='flex justify-between items-center  mt-5'>
            <h1 className='text-xl font-semibold' title={book.saleInfo.listPrice?.amount}>
              <>
               <Link className='' href={`${book.saleInfo.buyLink}`} target='_blank'>
                  {Math.round(book.saleInfo.listPrice?.amount)} {book.saleInfo.listPrice?.currencyCode}
               </Link>
              </>
            </h1>
          <button
          onClick={handleToggleCart}
          className={`px-4 py-2 rounded ${
            isBookInCart ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
          >
            {isBookInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          </div>
          )}
    </div>
  </figure>
  );
};

export default BookCard;
