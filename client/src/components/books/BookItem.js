import React, { useEffect } from "react";
import { connect } from "react-redux";
import Book from "./Book";
import { getBook, addBook } from "../../actions/books";

const BookItem = ({ getBook, addBook, books: { singleBook }, match }) => {
  useEffect(() => {
    getBook(match.params.id);
  }, [match.params.id, getBook]);

  const regex = /(<([^>]+)>)/gi;
  let bookInfo;
  if (singleBook !== null) {
    const saveBook = () => {
      let bookDesc;
      if (!singleBook.volumeInfo.description) {
        bookDesc = "No Info Available";
      } else {
        bookDesc = singleBook.volumeInfo.description.replace(regex, "");
      }

      let bookThumb;

      if (!singleBook.volumeInfo.imageLinks) {
        bookThumb = "No Image Available";
      } else {
        bookThumb = singleBook.volumeInfo.imageLinks.thumbnail;
      }

      const bookAuth = singleBook.volumeInfo.authors.join(",");
      const savedData = {
        title: singleBook.volumeInfo.title,
        subtitle: singleBook.volumeInfo.subtitle,
        authors: bookAuth,
        description: bookDesc,
        imageLink: bookThumb,
      };
      addBook(savedData);
    };
    bookInfo = <Book singleBook={singleBook} saveBook={saveBook} />;
  }
  return <>{bookInfo}</>;
};

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps, { getBook, addBook })(BookItem);
