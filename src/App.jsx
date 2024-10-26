//npm i
//git init
//git add -A
//git commit -m "init"
// git remote add origin https://github.com/ayaghini/test-devops-frontend.git
// git branch -M main
// git push -u origin main
//render.com -> new -> static type
//buid directiry: ./dist



import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorWebsite, setAuthorWebsite] = useState("");

  const BaseUrl = "https://test-devops-deploy.onrender.com";

  useEffect(() => {
    fetchBooks();
  }, []);

  

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const createBook = async () => {
    const reqBody = {
      title,
      authorName,
      authorWebsite,
      publishedYear: 2021, // example data
      genre: "Fiction" // example data
    };

    try {
      await axios.post(`${BaseUrl}/books`, reqBody);
      setTitle("");
      setAuthorName("");
      setAuthorWebsite("");
      fetchBooks(); // Refresh the list after adding a new book
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/books/${id}`);
      fetchBooks(); // Refresh the list after deleting a book
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <h1>Welcome to our Bookstore FE!</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book Title"
      />
      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Author Name"
      />
      <input
        type="text"
        value={authorWebsite}
        onChange={(e) => setAuthorWebsite(e.target.value)}
        placeholder="Author Website"
      />
      <button onClick={createBook}>Submit New Book</button>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>Author ID: {book.author_id}</p>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
