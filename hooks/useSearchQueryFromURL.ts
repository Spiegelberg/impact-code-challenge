// hooks/useSearchQueryFromURL.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useSearchQueryFromURL = (setSearchQuery: (query: string) => void) => {
  const router = useRouter();

  useEffect(() => {
    // Get the query parameter from the URL
    const { q } = router.query;

    // If there is a query parameter, update the search query state
    if (q) {
      setSearchQuery(q as string);
    }
  }, [router.query, setSearchQuery]);
};

export default useSearchQueryFromURL;