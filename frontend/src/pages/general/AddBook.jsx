import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import api from '../../api/AxiosInstance'; //not like axios here instance created
import { Navigate } from "react-router-dom";

const AddBook = () => {
 const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId") || "",
  name: '',
  authors: '',
  editors: '',
  publisher: '',
  languages: '',
  published_date: '',
  cover_images: '',
  price: '',
  pages: '', 
  genres: '',
  read_status: 'Unread',
  summary: '',
  my_note: '',
  rating: '',
  read_date: [],   // store as array
  lent_to: ''
});

// Handle single inputs
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

// Handle multiple dates
const handleDateChange = (index, value) => {
  const updatedDates = [...formData.read_date];
  updatedDates[index] = value;
  setFormData((prev) => ({
    ...prev,
    read_date: updatedDates
  }));
};
const addDateField = () => {
  setFormData((prev) => ({
    ...prev,
    read_date: [...prev.read_date, '']
  }));
};
const removeDateField = (index) => {
  const updatedDates = [...formData.read_date];
  updatedDates.splice(index, 1);
  setFormData((prev) => ({
    ...prev,
    read_date: updatedDates
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert fields into schema-compatible format
    const payload = {
      ...formData,
    //   userId: localStorage.getItem("userId") || "",
      authors: formData.authors ? formData.authors.split(",").map(s => s.trim()) : [],
      editors: formData.editors ? formData.editors.split(",").map(s => s.trim()) : [],
      publisher: formData.publisher ? formData.publisher.split(",").map(s => s.trim()) : [],
      languages: formData.languages ? formData.languages.split(",").map(s => s.trim()) : [],
      genres: formData.genres ? formData.genres.split(",").map(s => s.trim()) : [],
      cover_images: formData.cover_images ? formData.cover_images.split(",").map(s => s.trim()) : [],
      pages: formData.pages ? parseInt(formData.pages, 10) : null,
      price: formData.price ? parseFloat(formData.price) : null,
      rating: formData.rating ? parseInt(formData.rating, 10) : null,
      published_date: formData.published_date || null,
      read_date: formData.read_date.filter(date => date !== "") // already array, just clean up
    };

    // console.log("Final payload:", payload);
    alert("Form submitted! Check console.");
    setFormData({
          userId: localStorage.getItem("userId") || "",
  name: '',
  authors: '',
  editors: '',
  publisher: '',
  languages: '',
  published_date: '',
  cover_images: '',
  price: '',
  pages: '', 
  genres: '',
  read_status: 'Unread',
  summary: '',
  my_note: '',
  rating: '',
  read_date: [],   // store as array
  lent_to: ''
    })
    try{
        const res=api.post(import.meta.env.VITE_ADD_BOOK_API,payload);
        if(res.status===201){
            alert("Book added successfully!");
        }
    }catch(error){
        console.error("Error submitting form:", error);
    }
    
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex justify-center items-start p-10 bg-gray-50">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Add New Book
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Book Title */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Book Title *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter book title"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Authors */}
            <div>
              <label className="block text-gray-700 mb-2">Authors *</label>
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                placeholder="Comma-separated"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Editors */}
            <div>
              <label className="block text-gray-700 mb-2">Editors</label>
              <input
                type="text"
                name="editors"
                value={formData.editors}
                onChange={handleChange}
                placeholder="Comma-separated"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Publisher */}
            <div>
              <label className="block text-gray-700 mb-2">Publisher</label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Comma-separated"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Languages */}
            <div>
              <label className="block text-gray-700 mb-2">Languages *</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="Comma-separated"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Published Date */}
            <div>
              <label className="block text-gray-700 mb-2">Published Date</label>
              <input
                type="date"
                name="published_date"
                value={formData.published_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Cover Images */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Cover Images</label>
              <input
                type="text"
                name="cover_images"
                value={formData.cover_images}
                onChange={handleChange}
                placeholder="Comma-separated URLs"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 mb-2">Price (NPR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="e.g. 500"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Pages */}
            <div>
              <label className="block text-gray-700 mb-2">Pages *</label>
              <input
                type="number"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                required
                min="0"
                max="10000"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Genres */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Genres</label>
              <input
                type="text"
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                placeholder="Comma-separated"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Read Status */}
            <div>
              <label className="block text-gray-700 mb-2">Read Status *</label>
              <select
                name="read_status"
                value={formData.read_status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="Unread">Unread</option>
                <option value="Reading">Reading</option>
                <option value="Half-read">Half-read</option>
                <option value="Read">Read</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 mb-2">Rating (0–5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Summary */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Short summary of the book"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* My Note */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">My Note</label>
              <textarea
                name="my_note"
                value={formData.my_note}
                onChange={handleChange}
                placeholder="Personal notes"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
{/* Read Dates */}
<div className="col-span-2">
  <label className="block text-gray-700 mb-2">Read Dates</label>
  
  {formData.read_date.map((date, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="date"
        className="w-full p-2 border border-gray-300 rounded"
        value={date}
        onChange={(e) => handleDateChange(index, e.target.value)}
      />
      <button
        type="button"
        onClick={() => removeDateField(index)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Remove
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={addDateField}
    className="bg-green-500 text-white px-3 py-1 rounded mt-2"
  >
    + Add Date
  </button>
</div>


            {/* Lent To */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Lent To</label>
              <input
                type="text"
                name="lent_to"
                value={formData.lent_to}
                onChange={handleChange}
                placeholder="Person's name"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddBook;
