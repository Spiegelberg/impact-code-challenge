import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSearchQueryFromURL from '../hooks/useSearchQueryFromURL';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (router.pathname === '/') {
        // If on the home page, navigate to /books with the search query
        router.push(`/books?q=${searchQuery}`);
      } else {
        // If not on the home page, just trigger the search
        handleSearch();
      }
    }
  };

  useEffect(() => {
    // Get the query parameter from the URL
    const { q } = router.query;

    // If there is a query parameter, update the search input field
    if (q) {
      setSearchQuery(q as string);
    }
  }, [router.query]); // Re-run the effect when the query parameter changes

  return (
    <div className="my-4 flex flex-1">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for books..."
        className="w-full text-black border p-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 "
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

      </button>
    </div>
  );
};

export default SearchBar;