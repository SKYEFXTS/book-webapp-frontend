import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function BookDetails() {
    const [book, setBook] = useState(null);
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
    const { id } = useParams();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/books`, { params: { query: id } });
                setBook(response.data.items[0]);
            } catch (err) {
                console.error("Error fetching book details", err);
            }
        };
        fetchBookDetails();
    }, [id]);

    const addToWishlist = () => {
        if (!wishlist.find((item) => item.id === book.id)) {
            const updatedWishlist = [...wishlist, book];
            setWishlist(updatedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        }
    };

    if (!book) return <p>Loading book details...</p>;

    return (
        <div className="book-details">
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors?.slice(0, 3).join(", ") || "Unknown Author"}</p>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <p>{book.volumeInfo.description || "No description available."}</p>
            <button onClick={addToWishlist}>Add to Wishlist</button>
            <Link to="/" className="back-to-search-link">Back to Search</Link>
        </div>
    );
}

export default BookDetails;