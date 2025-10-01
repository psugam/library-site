import React from "react";

const Popup = ({ selectedBook, closePopup, onFilterRedirect }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center "
      onClick={closePopup}
    >
      <div
        className="bg-gray-600 text-white rounded-lg relative shadow-2xl w-[40vw] h-[80vh] p-6 overflow-y-auto
                   overflow-y-auto
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-black font-bold text-xl cursor-pointer"
          onClick={closePopup}
        >
          ×
        </button>

        <img
          src={selectedBook.cover_images[0]}
          alt={selectedBook.name}
          // className="w-full h-[50%] object-contain mb-4"
          className="min-h-[50%] max-h-[90%] object-cover mb-4"
        />
      <p className="text-lg">
  Author(s): {selectedBook.authors.map((a, i) => (
    <span
      key={i}
      onClick={() => onFilterRedirect("author", a)}
      className="cursor-pointer text-blue-300 hover:underline"
    >
      {a}{i < selectedBook.authors.length - 1 ? ", " : ""}
    </span>
  ))}
</p>

<p className="text-lg">
  Editor(s): {selectedBook.editors.map((e, i) => (
    <span
      key={i}
      onClick={() => onFilterRedirect("editor", e)}
      className="cursor-pointer text-blue-300 hover:underline"
    >
      {e}{i < selectedBook.editors.length - 1 ? ", " : ""}
    </span>
  ))}
</p>

<p >
   Publisher: 
  <span className="text-gray-200 cursor-pointer text-blue-300 hover:underline"
  onClick={() => onFilterRedirect("publisher", selectedBook.publisher)}>
 {selectedBook.publisher}
  </span>
</p>

<p>
  Language: {selectedBook.languages.map((lang, i) => (
    <span
      key={i}
      onClick={() => onFilterRedirect("language", lang)}
      className="cursor-pointer text-blue-300 hover:underline"
    >
      {lang}{i < selectedBook.languages.length - 1 ? ", " : ""}
    </span>
  ))}
</p>

<p>
  Genres: {selectedBook.genres.map((g, i) => (
    <span
      key={i}
      onClick={() => onFilterRedirect("genre", g)}
      className="cursor-pointer text-blue-300 hover:underline"
    >
      {g}{i < selectedBook.genres.length - 1 ? ", " : ""}
    </span>
  ))}
</p>

<p>

  Read Status: 
    <span className="text-gray-200 cursor-pointer text-blue-300 hover:underline" onClick={() => onFilterRedirect("read_status", selectedBook.read_status)}>
  {selectedBook.read_status}
    
  </span>
</p>

<p>
  Lent To: 
  <span   className="text-gray-200 cursor-pointer text-blue-300 hover:underline"
  onClick={() => onFilterRedirect("lent_to", selectedBook.lent_to)}>
  {selectedBook.lent_to ? selectedBook.lent_to : "-"}
  </span>
</p>

      </div>
    </div>
  );
};

export default Popup;
