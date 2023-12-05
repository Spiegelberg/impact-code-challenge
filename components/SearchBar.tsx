import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
  shadow: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading, shadow }) => {
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
        handleSearch();
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
    <div className={`my-4 flex flex-1 ${shadow ? 'drop-shadow-orange hover:drop-shadow-orange-sm':''} transition duration-300 ease-in-out`}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="What book would you like to find..."
        className="w-full text-black border p-2 "
      />
      <button
        onClick={handleSearch}
        className="bg-book-orange text-white px-4 py-2 "
      >
        {loading ? (
          <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        )}
        
      </button>
    </div>
  );
};

export default SearchBar;