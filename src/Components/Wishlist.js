import React, { useState } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);

    return (
        <div className="wishlist">
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No books in wishlist.</p>
            ) : (
                <div className="book-list">
                    {wishlist.map((book) => (
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
            <Link to="/">Back to Search</Link>
        </div>
    );
}

export default Wishlist;