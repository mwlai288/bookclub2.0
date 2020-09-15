import React from "react";
import { connect } from "react-redux";
import { deleteBook } from "../../actions/profile";

const BookList = ({ books, deleteBook }) => {
  const bookItem = books.map((book) => (
    <div key={book._id}>
      <div>
        <h1>{book.title}</h1>
        {book.subtitle && <p> {book.subtitle}</p>}
        <p>{book.authors}</p>
        <img src={book.imageLink} alt="" className="book-image" />
        <button className="btn btn-danger" onClick={() => deleteBook(book._id)}>
          Delete
        </button>
      </div>
    </div>
  ));
  return <>{bookItem}</>;
};

export default connect(null, { deleteBook })(BookList);
