import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './AxiosInstance';
import GridView from '../components/grid/GridView';
import TableView from '../components/table/TableView';

const GetAllBooks = ({view}) => {
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem('userId');
  const api_url = `http://localhost:3000/api/books/getbyid/${userId}`;

  useEffect(()=>{
        api.get(api_url)
      .then(response => {
        // console.log(response.data);
        setBooks(response.data); // store data in state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [api_url])

 return  (
 view === 'grid' ? <GridView books={books} /> : <TableView books={books} />
 )
}

export default GetAllBooks;