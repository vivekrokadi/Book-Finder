import React, { useEffect, useState } from 'react';

function BookModal({ book, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    let canceled = false;
    async function load() {
      try {
        if (!book?.key) {
          setDetails(null);
          return;
        }
        setLoading(true);
        const res = await fetch(`https://openlibrary.org${book.key}.json`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!canceled) setDetails(data);
      } catch {
        if (!canceled) setDetails(null);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => {
      canceled = true;
    };
  }, [book]);

  const coverUrl = () => {
    if (book.cover_i) return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    if (book.cover_edition_key) return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-900 max-w-3xl w-full rounded-lg border border-gray-800 p-6 mx-4 text-white"
      >
        <div className="flex justify-between items-start gap-6 mb-6">
          <div className="flex gap-4">
            {coverUrl() ? (
              <img
                src={coverUrl()}
                alt={book.title}
                className="w-24 h-32 object-cover rounded"
              />
            ) : (
              <div className="w-24 h-32 bg-gray-800 rounded flex items-center justify-center text-gray-500">
                No cover
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <div className="text-gray-400 text-sm mt-1">
                {book.author_name?.join(", ")}
              </div>
              <div className="text-gray-500 text-xs mt-2">
                First published: {book.first_publish_year || "—"}
              </div>
              <a
                className="text-xs text-blue-400 mt-2 inline-block hover:underline"
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Open Library ↗
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>

        <div className="text-sm">
          {loading && <div className="text-gray-400">Loading details…</div>}
          {!loading && details && (
            <>
              {details.description && (
                <p className="text-gray-300 mb-4">
                  {typeof details.description === "string"
                    ? details.description
                    : details.description.value}
                </p>
              )}
              {details.subjects && (
                <div className="text-gray-500 text-xs">
                  Subjects: {details.subjects.slice(0, 10).join(", ")}
                </div>
              )}
            </>
          )}
          {!loading && !details && (
            <div className="text-gray-500">No extra details available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookModal;