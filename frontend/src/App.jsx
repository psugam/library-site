import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

 import { BrowserRouter, Routes, Route } from 'react-router-dom';

 import Home from './pages/general/Home'
 import About from './pages/general/About'
 import Navbar from './components/Navbar'
 import Footer from './components/Footer'
import Stats from './pages/general/Stats';
import Profile from './pages/general/Profile';

import GetAllBooks from './api/HandleBookApi';
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import LibraryLandingPage from './pages/general/LibraryLandingPage';
import { AuthProvider } from './pages/authentication/AuthContext';
import ProtectedRoute from './pages/authentication/ProtectedRoute';
import Redirecting from './pages/authentication/Redirecting';
import AddBook from './pages/general/AddBook';
import EditBook from './pages/general/EditBook';
function App() {
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token){
      localStorage.clear();
    }
  })

  return (
<>
<AuthProvider>
<BrowserRouter>

<Routes>
      {/* unprotected routes */}
      <Route path='/' element={<LibraryLandingPage/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path ='/registration' element={<Registration/>}/>

       <Route
        path="/home" 
        element={
        <ProtectedRoute><Home/></ProtectedRoute>
        
        } />

       <Route path="/about" element={ <ProtectedRoute><About/></ProtectedRoute>}/>
       
       <Route path='/addbook' element={<ProtectedRoute><AddBook/></ProtectedRoute>}/>
       
       <Route path="/editbook/:bookId" element={ <ProtectedRoute><EditBook/></ProtectedRoute>}/>

       <Route path='/stats' element={<ProtectedRoute><Stats/></ProtectedRoute>}/>
       <Route path='/profile' element ={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/redirecting' element ={<ProtectedRoute><Redirecting/></ProtectedRoute>}/>

</Routes>
</BrowserRouter>
</AuthProvider>
</>
  )
}

export default App
