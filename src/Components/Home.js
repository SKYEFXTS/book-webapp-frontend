import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import searchIcon from "../assets/search-icon.png";

function Home() {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        setError("");
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/books`, { params: { query } });
            setBooks(response.data.items || []);
        } catch (err) {
            console.error(err);
            setError("Error fetching books. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchBooks();
        }
    };

    return (
        <div className="App">
            <h1>Book Web App</h1>
            <h3>Search for books</h3>
            <h5>Powered by Google Books API</h5>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={fetchBooks}>
                    <img src={searchIcon} alt="Search" className="search-icon" />
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {loading ? <p>Loading...</p> : (
                <div className="book-list">
                    {books.map((book) => (
                        <Link to={`/book/${book.id}`} key={book.id} className="book-item">
                            <div>
                                <h3>{book.volumeInfo.title}</h3>
                                <p>{book.volumeInfo.authors?.slice(0, 3).join(", ") || "Unknown Author"}</p>
                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Link to="/wishlist" className="wishlist-link">Go to Wishlist</Link>
        </div>
    );
}

export default Home;