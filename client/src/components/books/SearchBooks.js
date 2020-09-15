import React, { useState } from "react";
import { connect } from "react-redux";
import { searchedBooks } from "../../actions/books";
import BookList from "./BookList";

const SearchBooks = ({ searchedBooks, books: { allBooks } }) => {
  const [search, setSearch] = useState("");

  const findBook = (e) => {
    e.preventDefault();
    searchedBooks(search);
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  let bookResults;
  if (allBooks === null) {
    bookResults = null;
  } else {
    if (allBooks.length > 0) {
      bookResults = allBooks.map((book) => (
        <BookList key={book.id} book={book} />
      ));
    } else {
      bookResults = <h2>No results found...</h2>;
    }
  }

  return (
    <>
      <form className="form">
        <div className="form-group">
          <p>Search by title or author</p>
          <input
            onChange={onChange}
            type="text"
            name="book"
            placeholder="Title or Author(s)"
            value={search}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Search"
          onClick={findBook}
        />

        <div className="book-grid">{bookResults}</div>
      </form>
    </>
  );
};
const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps, { searchedBooks })(SearchBooks);
