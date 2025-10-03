import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../api/AxiosInstance'
import { useParams } from 'react-router-dom'

const EditBook = () => {
  const { bookId } = useParams()
  const [oneBook, setOneBook] = useState({})
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
    rating: 0,
    read_date: [],
    lent_to: ''
  })

  const API_URL = `${import.meta.env.VITE_GET_ONE_BOOK_API}/${bookId}`
  console.log(API_URL)

  // Fetch the book
  useEffect(() => {
    api
      .get(API_URL)
      .then((res) => {
        setOneBook(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [API_URL])

  // Update formData when oneBook changes
  useEffect(() => {
    if (oneBook && Object.keys(oneBook).length > 0) {
      setFormData({
        userId: localStorage.getItem("userId") || "",
        name: oneBook.name || '',
        authors: oneBook.authors || '',
        editors: oneBook.editors || '',
        publisher: oneBook.publisher || '',
        languages: oneBook.languages || '',
        published_date: oneBook.published_date || '',
        cover_images: oneBook.cover_images || '',
        price: oneBook.price || '',
        pages: oneBook.pages || '',
        genres: oneBook.genres || '',
        read_status: oneBook.read_status || 'Unread',
        summary: oneBook.summary || '',
        my_note: oneBook.my_note || '',
        rating: oneBook.rating || 0,
        read_date: oneBook.read_date || [],
        lent_to: oneBook.lent_to || '',
      })
    }
  }, [oneBook])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Example submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting updated book:", formData)
    // api.put(`/your-update-endpoint/${bookId}`, formData)
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm">Authors</label>
            <input
              type="text"
              name="authors"
              value={formData.authors}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          {/* Add more fields as needed */}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default EditBook
