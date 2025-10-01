import React from "react";
import Search from "../search/Search"

const Filters = ({ filters, setFilters, bookData, searchTerm, setSearchTerm }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      read_status: "all",
      language: "all",
      lent_status: "all",
      genre: "all",
    });
    setSearchTerm(""); // Also clear search when clearing filters
  };

  // Unique options
  const languages = Array.from(new Set(bookData.flatMap((b) => b.languages)));
  const genres = Array.from(new Set(bookData.flatMap((b) => b.genres)));

  return (
  <div className="flex gap-4 mb-4 flex-wrap items-center justify-center w-[100%]">

    
{/* Read Status */}
<div>
  <label className="text-white mr-2">Read Status:</label>
  <select
    name="read_status"
    value={filters.read_status}
    onChange={handleFilterChange}
    className="px-2 py-1 rounded bg-gray-700 text-white"
  >
    <option value="all">All</option>
    <option value="Read">Read</option>
    <option value="Unread">Unread</option>
    <option value="Reading">Reading</option>
    <option value="Half-Read">Half-Read</option>
  </select>
</div>


      {/* Language */}
      <div>
        <label className="text-white mr-2">Language:</label>
        <select
          name="language"
          value={filters.language}
          onChange={handleFilterChange}
          className="px-2 py-1 rounded bg-gray-700 text-white"
        >
          <option value="all">All</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Lent Status */}
      <div>
        <label className="text-white mr-2">Lent:</label>
        <select
          name="lent_status"
          value={filters.lent_status}
          onChange={handleFilterChange}
          className="px-2 py-1 rounded bg-gray-700 text-white"
        >
          <option value="all">All</option>
          <option value="lent">Lent</option>
          <option value="not_lent">Not Lent</option>
        </select>
      </div>

      {/* Genre */}
      <div>
        <label className="text-white mr-2">Genre:</label>
        <select
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          className="px-2 py-1 rounded bg-gray-700 text-white"
        >
          <option value="all">All</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
            {/* Search */}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700"
      >
        Clear All
      </button>
    </div>
  );
};

export default Filters;