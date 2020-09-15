import React from "react";

const ProfileBooks = ({ books }) => {
  const showBooks = books.map((book) => (
    <div key={book._id}>
      <h2>{book.title}</h2>
      <h4>{book.subtitle}</h4>
      <div>{book.authors}</div>
      {book.imageLink === "" ? null : (
        <img src={book.imageLink} alt="" className="book-image" />
      )}
    </div>
  ));

  return (
    <>{books.length === 0 ? <span>No books saved to shelf</span> : showBooks}</>
  );
};

export default ProfileBooks;
