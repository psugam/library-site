import React, { useState } from "react";
import Popup from "../Popup.jsx";
import Filters from "../options/Filters.jsx";
import useBookFilters from "../options/UseBookFilters.jsx"

const TableView = ({ books }) => {
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
    startIndex,
  } = useBookFilters(books);

  const handleClick = (book) => setSelectedBook(book);
  const closePopup = () => setSelectedBook(null);

  const displayBook = currentBooks.map((info, index) => {
    const rowBg =
      index % 2 === 0
        ? "bg-gray-500 dark:bg-gray-600"
        : "bg-gray-400 dark:bg-gray-700";

    return (
      <tr
        key={info._id}
        onClick={() => handleClick(info)}
        className={`${rowBg} hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors`}
      >
        <td className="px-4 py-2">{startIndex + index + 1}</td>
        <td className="px-4 py-2 font-medium text-white">{info.name}</td>
        <td className="px-4 py-2 text-white">{info.authors.join(", ")}</td>
        <td className="px-4 py-2 text-white">{info.editors.join(", ")}</td>
        <td className="px-4 py-2 text-white">{info.publisher}</td>
        <td className="px-4 py-2 text-white">{info.languages.join(", ")}</td>
        <td className="px-4 py-2 text-white">
          {info.published_date.substr(0, 10)}
        </td>
        <td className="px-4 py-2">
          <img
            src={
              info.cover_images?.length ? info.cover_images[0] : "/placeholder.jpg"
            }
            alt={info.name}
            className="w-12 h-16 object-cover rounded"
          />
        </td>
        <td className="px-4 py-2 text-white">{info.price}</td>
        <td className="px-4 py-2 text-white">{info.pages}</td>
        <td className="px-4 py-2 text-white">{info.genres.join(", ")}</td>
        <td className="px-4 py-2 max-w-xs truncate text-white">
          {info.summary}
        </td>
        <td className="px-4 py-2">
          <span className="px-2 py-1 rounded-full text-sm font-semibold">
            {info.read_status}
          </span>
        </td>
        <td className="px-4 py-2 text-white">
          {info.read_dates?.length ? info.read_dates.join(", ") : "-"}
        </td>
        <td className="px-4 py-2 text-white">{info.lent_to || "-"}</td>
        <td className="px-4 py-2 text-white">{info.rating || "-"}</td>
      </tr>
    );
  });

  return (
    <>
      {/* Filters + Search */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        bookData={books}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Results Count */}
      <div className="text-white mb-4 px-4 text-center">
        Showing {currentBooks.length} of {filteredBooks.length} books
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-700 dark:bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">SN</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Authors</th>
              <th className="px-4 py-2">Editors</th>
              <th className="px-4 py-2">Publisher</th>
              <th className="px-4 py-2">Languages</th>
              <th className="px-4 py-2">Published Date</th>
              <th className="px-4 py-2">Image(s)</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Pages</th>
              <th className="px-4 py-2">Genres</th>
              <th className="px-4 py-2">Summary</th>
              <th className="px-4 py-2">Read Status</th>
              <th className="px-4 py-2">Read Dates</th>
              <th className="px-4 py-2">Lent To</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>{displayBook}</tbody>
        </table>
      </div>

      {/* Pagination + Rows per page */}
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

export default TableView;
