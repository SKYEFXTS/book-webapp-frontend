import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import BookDetails from "./Components/BookDetails";
import Wishlist from "./Components/Wishlist";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
        </Router>
    );
}

export default App;