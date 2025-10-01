import React, { useState } from "react";
import Popup from "../Popup.jsx";
import Filters from "../options/Filters.jsx";
import useBookFilters from "../options/UseBookFilters.jsx"

const GridView = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);

    const handleFilterRedirect = (field, value) => {
  if (!value) return;

  switch (field) {
    case "author":
      setSearchTerm(value); // authors handled via search
      break;
    case "editor":
      setSearchTerm(value); // editors also via search
      break;
    case "publisher":
      setSearchTerm(value);
      break;
    case "language":
      setFilters((prev) => ({ ...prev, language: value }));
      break;
    case "genre":
      setFilters((prev) => ({ ...prev, genre: value }));
      break;
    case "read_status":
      setFilters((prev) => ({ ...prev, read_status: value }));
      break;
    case "lent_to":
      if (value) {
        setFilters((prev) => ({ ...prev, lent_status: "lent" }));
        setSearchTerm(value);
      }
      break;
    default:
      break;
  }

  closePopup();
};





  const {
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    noOfRows,
    setNoOfRows,
    filteredBooks,
    currentBooks,
    totalPages,
  } = useBookFilters(books);

  const handleClick = (book) => setSelectedBook(book);
  const closePopup = () => setSelectedBook(null);

  return (
    <>
      {/* Filters */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        bookData={books}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
        {currentBooks.length > 0 ? (
          currentBooks.map((info, index) => (
            <div
              key={info._id}
              onClick={() => handleClick(info)}
              className="bg-gray-700 text-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-600 transition-colors"
            >
              <img
                src={
                  info.cover_images?.length > 0
                    ? info.cover_images[0]
                    : "/placeholder.jpg"
                }
                alt={info.name}
                className="w-32 h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold mb-2 text-center">{info.name}</h2>
              <p className="text-sm mb-1 text-center">
                {info.authors.join(", ")}
              </p>
              <p className="text-sm text-center">
                {info.published_date.substr(0, 10)}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-white text-lg">
            No books found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-row items-center w-[50%] mx-auto justify-around px-6 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-white font-medium">
            Rows:
          </label>
          <select
            id="pageSize"
            value={noOfRows}
            onChange={(e) => {
              setNoOfRows(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
            className="px-3 py-1 rounded-md border border-gray-400 bg-gray-700 text-white"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value={books.length}>All</option>
          </select>
        </div>
      </div>

      {/* Popup */}
{selectedBook && (
  <Popup 
    selectedBook={selectedBook} 
    closePopup={closePopup} 
    onFilterRedirect={handleFilterRedirect}
  />
)}
    </>
  );
};

export default GridView;
