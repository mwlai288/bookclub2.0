import React from "react";
import { Link } from "react-router-dom";
const Book = ({ singleBook, saveBook }) => {
  const regex = /(<([^>]+)>)/gi;

  return (
    <>
      {singleBook && (
        <div className="description-grid">
          <section>
            <h1>Title: {singleBook.volumeInfo.title}</h1>
            {singleBook.volumeInfo.subtitle}
            <p>{singleBook.volumeInfo.authors.join(",")}</p>
            {singleBook.volumeInfo.description.replace(regex, "")}
          </section>
          <section>
            <img
              src={singleBook.volumeInfo.imageLinks.smallThumbnail}
              alt="book cover"
              className="book-image"
            />
          </section>
        </div>
      )}
      <Link to="#!" onClick={saveBook}>
        Save to Bookshelf
      </Link>
    </>
  );
};

export default Book;
