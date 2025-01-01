import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";
import searchIcon from "./assets/search-icon.png";

function App() {
    // Main App component sets up routing for the application
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Route for the main home page */}
                <Route path="/book/:id" element={<BookDetails />} /> {/* Route for the book details page */}
                <Route path="/wishlist" element={<Wishlist />} /> {/* Route for the wishlist page */}
            </Routes>
        </Router>
    );
}

function Home() {
    // State to track search query, books from API, and any errors
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    // Function to fetch books from the backend API
    const fetchBooks = async () => {
        setError(""); // Clear any previous errors
        try {
            const response = await axios.get(`http://localhost:8080/api/books`, {
                params: { query }, // Pass query as a parameter to the backend API
            });
            setBooks(response.data.items || []); // Update the books list
        } catch (err) {
            console.error(err);
            setError("Error fetching books. Please try again."); // Display an error if fetch fails
        }
    };

    // Search when the Enter key is pressed
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchBooks();
        }
    };

    return (
        <div className="App">
            {/* Header and description */}
            <h1>Book Web App</h1>
            <h3>Search for books</h3>
            <h5> Powered by Google Books API</h5>
            {/* Search bar input and button */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update state as the user types
                    onKeyDown={handleKeyDown} // Search on Enter key press
                />
                <button onClick={fetchBooks}>
                    <img src={searchIcon} alt={"Search"} className="search-icon" />
                </button>
            </div>
            {/* Display an error message if an error occurred */}
            {error && <p className="error">{error}</p>}
            {/* Display the list of books */}
            <div className="book-list">
                {books.map((book) => (
                    // Each book item is wrapped in a Link component that navigates to the book details page
                    <Link to={`/book/${book.id}`} key={book.id} className="book-item">
                    <div>
                        <h3>{book.volumeInfo.title}</h3> {/* Display the book title */}
                        <p>{
                            book.volumeInfo.authors
                                ?.slice(0, 3)
                                .join(", ") || "Unknown Author"}
                            {/* Display up to 3 authors or a fallback if none exist */}
                        </p>
                        <img
                            src={book.volumeInfo.imageLinks?.thumbnail}
                            alt={book.volumeInfo.title}
                        /> {/* Display the book's thumbnail or leave blank if unavailable */}
                    </div>
                    </Link>
                ))}
            </div>
            {/* Link to the wishlist page */}
            <Link to="/wishlist" className="wishlist-link">Go to Wishlist</Link>
        </div>
    );
}

function BookDetails() {
    const [book, setBook] = useState(null); // State for book details
    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || []; // Retrieve wishlist from localStorage
    });
    const { id } = useParams(); // Extract book ID from URL

    // Fetch book details when component is mounted
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/books`, {
                    params: { query: id }, // Use the book ID as the search query
                });
                setBook(response.data.items[0]); // Set the first matching book
            } catch (err) {
                console.error("Error fetching book details", err); // Log errors to the console
            }
        };
        fetchBookDetails();
    }, [id]);

    // Add current book to wishlist
    const addToWishlist = () => {
        if (!wishlist.find((item) => item.id === book.id)) {
            const updatedWishlist = [...wishlist, book];
            setWishlist(updatedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to localStorage
        }
    };

    if (!book) return <p>Loading book details...</p>; // Show loading message

    return (
        <div className="book-details">
            {/* Display book details */}
            <h2>{book.volumeInfo.title}</h2>
            <p>{
                book.volumeInfo.authors
                    ?.slice(0, 3)
                    .join(", ") || "Unknown Author"
            }</p>
            <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
            />
            <p>{book.volumeInfo.description || "No description available."}</p>
            {/* Button to add the book to the wishlist */}
            <button onClick={addToWishlist}>Add to Wishlist</button>
            {/* Link to go back to the home page */}
            <Link to="/" className="back-to-search-link" >Back to Search</Link>
        </div>
    );
}

function Wishlist() {
    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || []; // Get wishlist from localStorage
    });

    return (
        <div className="wishlist">
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
                // Display a message if the wishlist is empty
                <p>No books in wishlist.</p>
            ) : (
                // Display books in the wishlist
                <div className="book-list">
                    {wishlist.map((book) => (
                        <Link
                            to={`/book/${book.id}`}
                            key={book.id}
                            className="book-item">
                        <div>
                            <h3>{book.volumeInfo.title}</h3>
                            <p>{
                                book.volumeInfo.authors
                                    ?.slice(0, 3)
                                    .join(", ") || "Unknown Author"
                            }</p>
                            <img
                                src={book.volumeInfo.imageLinks?.thumbnail}
                                alt={book.volumeInfo.title}
                            />
                        </div>
                        </Link>
                    ))}
                </div>
            )}
            {/* Link to go back to the home page */}
            <Link to="/">Back to Search</Link>
        </div>
    );
}

export default App;
