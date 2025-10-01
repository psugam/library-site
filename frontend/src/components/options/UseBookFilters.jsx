import { useState, useEffect } from "react";

const useBookFilters = (books) => {
  const [filters, setFilters] = useState({
    read_status: "all",
    language: "all",
    lent_status: "all",
    genre: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfRows, setNoOfRows] = useState(
    () => sessionStorage.getItem("noOfRows") || 10
  );

  useEffect(() => {
    sessionStorage.setItem("noOfRows", noOfRows.toString());
  }, [noOfRows]);

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  // Apply filters + search
  const filteredBooks = books.filter((book) => {
    const readMatch =
      filters.read_status === "all" ||
      book.read_status?.toLowerCase() === filters.read_status.toLowerCase();

    const languageMatch =
      filters.language === "all" || book.languages.includes(filters.language);

    const lentMatch =
      filters.lent_status === "all" ||
      (filters.lent_status === "lent" && book.lent_to) ||
      (filters.lent_status === "not_lent" && !book.lent_to);

    const genreMatch =
      filters.genre === "all" || book.genres.includes(filters.genre);

    const lowerTerm = searchTerm.toLowerCase();

const searchMatch =
  searchTerm === "" ||
  (typeof book.name === "string" &&
    book.name.toLowerCase().includes(lowerTerm)) ||
  (Array.isArray(book.authors) &&
    book.authors.some((a) =>
      typeof a === "string" && a.toLowerCase().includes(lowerTerm)
    )) ||
  (Array.isArray(book.editors) &&
    book.editors.some((e) =>
      typeof e === "string" && e.toLowerCase().includes(lowerTerm)
    )) ||
  (Array.isArray(book.publisher) &&
    book.publisher.some((p) =>
      typeof p === "string" && p.toLowerCase().includes(lowerTerm)
    )) ||
  (Array.isArray(book.genres) &&
    book.genres.some((g) =>
      typeof g === "string" && g.toLowerCase().includes(lowerTerm)
    )) ||
  (typeof book.summary === "string" &&
    book.summary.toLowerCase().includes(lowerTerm)) ||
  (typeof book.lent_to === "string" &&
    book.lent_to.toLowerCase().includes(lowerTerm));


    return readMatch && languageMatch && lentMatch && genreMatch && searchMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / noOfRows);
  const startIndex = (currentPage - 1) * noOfRows;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + Number(noOfRows)
  );

  return {
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
  };
};

export default useBookFilters;
