import React, { useState, useEffect } from 'react';

function Search({ searchTerm, setSearchTerm }) {
  const [inputValue, setInputValue] = useState(searchTerm || "");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
    useEffect(() => {
    setInputValue(searchTerm || "");
  }, [searchTerm]);


  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search books, authors, genres..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="px-3 py-1 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-blue-400"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700"
      >
        Search
      </button>
    </div>
  );
}

export default Search;