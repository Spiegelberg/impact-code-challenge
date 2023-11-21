// pages/books/index.tsx
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
// import { useRouter } from 'next/router';
import { fetchBooks } from '@pages/api/fetchBooks';
import BookCard from '@components/BookCard';
import ShoppingCartIcon from '@components/ShoppingCartIcon'; // Import ShoppingCartIcon
import { CartContext } from '@context/CartContext'; // Import CartContext
import SearchBar from '@components/SearchBar';
import useSearchQueryFromURL from '@hooks/useSearchQueryFromURL'; 

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState([]);
  // const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { cart } = useContext(CartContext);

  const handleSearch = async (query: string) => {
    setLoading(true); // Set loading to true when starting the API call
    setSearchQuery(query);
    try {
      const data = await fetchBooks(query);
      setBooks(data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false); // Set loading to false when API call completes (either success or failure)
    }
  };

  // useSearchQueryFromURL(handleSearch);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Book Browsing</h1>
        <div className="flex w-full items-center flex-1 ml-3">
          <SearchBar onSearch={handleSearch} />
          <ShoppingCartIcon /> {/* Include ShoppingCartIcon */}
        </div>
      </div>

      
      {loading ? (
        <p className='text-center'>fetching books from google ...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 h-full">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
