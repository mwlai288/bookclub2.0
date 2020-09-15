import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ book }) => {
  return (
    <>
      <Link to={`/book/${book.id}`}>
        <h1>{book.volumeInfo.title}</h1>
        {book.volumeInfo.imageLinks && (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt=""
            className="book-image"
          />
        )}
      </Link>
    </>
  );
};
export default BookList;
