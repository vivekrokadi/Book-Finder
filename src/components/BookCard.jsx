import React from 'react';

function BookCard({ book, onClick }) {
  const coverUrl = () => {
    if (book.cover_i) return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    if (book.cover_edition_key) return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
    return null;
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 p-4 cursor-pointer flex gap-4 transition-colors"
    >
      {coverUrl() ? (
        <img
          src={coverUrl()}
          alt={book.title}
          className="w-20 h-28 object-cover rounded"
        />
      ) : (
        <div className="w-20 h-28 bg-gray-800 rounded flex items-center justify-center text-gray-500">
          No cover
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium truncate">{book.title}</h3>
        <p className="text-gray-400 text-sm mt-1 truncate">
          {book.author_name?.join(", ")}
        </p>
        <p className="text-gray-500 text-xs mt-2">
          {book.first_publish_year || "—"}
        </p>
      </div>
    </div>
  );
}

export default BookCard;