import React from 'react';
import BookCard from './BookCard';

function BookGrid({ books = [], onSelect, isLoading = false, currentPage = 1, booksPerPage = 25 }) {
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="min-h-64 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-gray-700 rounded-full animate-spin border-4 border-gray-900 border-t-blue-600"></div>
          <p className="text-gray-400 font-medium">Loading books...</p>
        </div>
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Discover, Search & Explore Books Instantly.</h3>
          
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentBooks.map((book) => (
          <BookCard 
            key={book.key || book.cover_edition_key || book.isbn?.[0]} 
            book={book} 
            onClick={() => onSelect(book)}
          />
        ))}
      </div>

      
    </div>
  );
}

export default BookGrid;