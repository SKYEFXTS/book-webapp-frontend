# Book Web App

This project is a Book Web App that allows users to search for books, view book details, and manage a wishlist. It is built using React and leverages the Google Books API for fetching book data.

## Features

- **Search for Books**: Users can search for books by entering a query.
- **View Book Details**: Users can view detailed information about a selected book.
- **Manage Wishlist**: Users can add books to a wishlist and view their wishlist.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/SKYEFXTS/book-web-app.git
   cd book-web-app

2. Install dependencies:
   ```sh
   npm install
   
### Running the App

To run the app in development mode, use:
  ```sh
     npm start
   ```
Open http://localhost:3000 to view it in your browser. The page will reload when you make changes.

### Building the App

To build the app for production, use:
  ```sh
     npm run build
   ```
This will create a build folder with a production build of the app.

## Project Structure

- `src/`: Contains the source code of the application.
   - `components/`: Contains React components.
      - `Home.js`: Component for the home page where users can search for books.
      - `BookDetails.js`: Component for displaying detailed information about a book.
      - `Wishlist.js`: Component for managing and viewing the wishlist.
   - `App.js`: Main application component that sets up routing.
   - `App.css`: Main stylesheet for the application.

- `public/`: Contains static assets and the HTML template.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Google Books API**: API used to fetch book data for searching and viewing details.
- **CSS**: Stylesheet for the overall app's layout and design.

## Author

This project is developed and maintained by **Oshan Nanayakkara**.  
You can reach me at: [oshannr@gmail.com](mailto:oshannr@gmail.com)