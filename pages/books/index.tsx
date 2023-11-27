// pages/books/index.tsx
import Link from 'next/link';
import { useEffect, useRef, useState, useContext } from 'react';
import { fetchBooks } from '@pages/api/fetchBooks';
import BookCard from '@components/BookCard';
import ShoppingCartIcon from '@components/ShoppingCartIcon'; // Import ShoppingCartIcon
import { CartContext } from '@context/CartContext'; // Import CartContext
import SearchBar from '@components/SearchBar';
import useSearchQueryFromURL from '@hooks/useSearchQueryFromURL'; 

const BooksPage: React.FC = ({ books }) => {
  const [searchedBooks, setSearchedBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { cart } = useContext(CartContext);
  const isSearchInProgress = useRef(false); // Use a ref to track search state

  const handleSearch = async (query: string) => {
    if (isSearchInProgress.current) {
      // If a search is already in progress, return to avoid starting a new one
      return;
    }
    try {
      isSearchInProgress.current = true; 
      setLoading(true); // Set loading to true when starting the API call
      setSearchQuery(query);
      const data = await fetchBooks(query);
      setSearchedBooks(data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false); 
      isSearchInProgress.current = false; 
    }
  };

  // useSearchQueryFromURL(handleSearch);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Book Browsing</h1>
        <div className="flex w-full items-center flex-1 ml-3">
          <SearchBar onSearch={handleSearch} loading={loading} />
          <ShoppingCartIcon /> {/* Include ShoppingCartIcon */}
        </div>
      </div>

      
      {loading ? (
        <p className='text-center'>fetching books from google ...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 h-full">
          {searchedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: object) {
  // Fetch data here and pass it as a prop to the component
  const { q } = context.query; 
  const data = await fetchBooks(q);

  return {
    props: {
      books: data,
    },
  };
}

export default BooksPage;
