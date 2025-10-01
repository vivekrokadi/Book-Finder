import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookGrid from "./components/BookGrid";
import BookModal from "./components/BookModal";

function App() {
  const [books, setBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch trending books on first load
  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch(
          "https://openlibrary.org/subjects/fantasy.json?limit=20"
        );
        const data = await res.json();

        const mapped = data.works.map((w) => ({
          key: w.key,
          title: w.title,
          author_name: w.authors?.map((a) => a.name),
          first_publish_year: w.first_publish_year,
          cover_i: w.cover_id,
        }));
        setTrendingBooks(mapped);
      } catch {}
    }
    fetchTrending();
  }, []);

  async function handleSearch({ title, author, isbn }) {
    setLoading(true);
    setError("");
    setCurrentPage(1);

    try {
      let url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
        title
      )}`;
      if (author) url += `&author=${encodeURIComponent(author)}`;
      if (isbn) url += `&isbn=${encodeURIComponent(isbn)}`;
      url += "&limit=100";

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const displayBooks = books.length > 0 ? books : trendingBooks;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Book Finder</h1>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && <div className="text-center text-red-400 mt-4">{error}</div>}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            {books.length > 0 ? "Search Results" : "Trending Books"}
          </h2>
          <BookGrid
            books={displayBooks}
            onSelect={setSelectedBook}
            isLoading={loading}
            currentPage={currentPage}
          />
        </div>

        {selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
        <footer className=" text-white flex justify-between px-2.5 mt-8 text-center">
        <h2 className="text-lg font-semibold">Book Finder</h2>
        <p className="text-sm mt-1">Powered by Open Library API</p>
      </footer>
      </div>
      
    </div>
  );
}

export default App;
