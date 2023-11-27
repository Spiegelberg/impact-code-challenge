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
    <figure key={book.id} className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 ">
      <div className='relative w-full'>
      {book.volumeInfo.imageLinks && (
        <Image 
          className="book-card-image w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" 
          src={book.volumeInfo.imageLinks.thumbnail}
          alt=""
          fill={true}
          
          />
      )}
    </div>
  <div className="md:p-8 text-center md:text-left space-y-4">
  <h2 className="text-xl font-semibold mb-2">
        <Link className="text-blue-500 hover:underline ml-1" href={`/books/${book.id}`}>
        {book.volumeInfo.title}
        </Link>
      </h2>
    {book.volumeInfo.description && (
        <blockquote>
          <p className="text-lg font-medium">
          {book.volumeInfo.description.length > 200 ? (
            <>
              {book.volumeInfo.description.slice(0, 200)}...
              <Link className="text-blue-500 hover:underline ml-1" href={`/books/${book.id}`}>
                Read More
              </Link>
            </>
          ) : (
            book.volumeInfo.description
          )}
          </p>
        </blockquote>
      )}
    {/* <blockquote>
      <p className="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote> */}
    <figcaption className="font-medium">
      <div className="text-sky-500 dark:text-sky-400">
      {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
      </div>
      <div className="text-slate-700 dark:text-slate-500">
      {book.volumeInfo.publisher} | {book.volumeInfo.publishedDate} | {book.volumeInfo.pageCount} pages
      </div>
    </figcaption>
  </div>
</figure>
    /* <div key={book.id} className="bg-white p-4 rounded-md shadow-sm transition-transform transform hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-2">
        <Link className="text-blue-500 hover:underline ml-1" href={`/books/${book.id}`}>
        {book.volumeInfo.title}
        </Link>
      </h2>
      <div>

      {book.volumeInfo.imageLinks && (
        <Image
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
        fill={true}
        className="mb-2 rounded-md"
        />
        )}
        </div>

      <p className="text-gray-700 mb-2">
        {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
      </p>
      <p className="text-gray-700">
        {book.volumeInfo.publisher} | {book.volumeInfo.publishedDate} | {book.volumeInfo.pageCount} pages
      </p>

      {book.volumeInfo.description && (
        <div className="text-gray-700 mt-2">
          {book.volumeInfo.description.length > 200 ? (
            <>
              {book.volumeInfo.description.slice(0, 200)}...
              <Link className="text-blue-500 hover:underline ml-1" href={`/books/${book.id}`}>
                Read More
              </Link>
            </>
          ) : (
            book.volumeInfo.description
          )}
        </div>
      )}

      
      <button
        onClick={handleToggleCart}
        className={`px-4 py-2 rounded mt-3 ${
          isBookInCart ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isBookInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div> */
  );
};

export default BookCard;
