const GOOGLE_BOOKS_API_KEY = ''; 

export const fetchBooks = async (query: string): Promise<any> => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const filtered = data.items.filter(i => !!i.volumeInfo.description )
      return filtered || [];
    } catch (error) {
      console.error('Error fetching data from Google Books API:', error);
      throw error;
    }
  };

export const fetchBookDetails = async (id: string): Promise<any> => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${id}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
    }
  };