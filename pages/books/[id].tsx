import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchBookDetails } from '../api/fetchBooks';

const BookDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBookDetails(id);
        setBook(data);
      } catch (error) {
        // Handle error
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book Details</h1>
      <h2>{book.volumeInfo.title}</h2>
      {/* Display additional book details */}
    </div>
  );
};

export default BookDetailsPage;