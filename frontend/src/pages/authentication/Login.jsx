import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { AuthContext } from './AuthContext';
import api from '../../api/AxiosInstance';

const Example = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // If already authenticated, redirect immediately
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post(import.meta.env.VITE_LOGIN_API, {
        username,
        password
      });

      if (res.status === 200) {
        setMessage('Login successful!');
        setUsername('');
        setPassword('');

        const userId = jwtDecode(res.data.token).id;
        localStorage.setItem('userId', userId);
        
        // Use the login function from AuthContext
        login(res.data.token);
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || "Server not responding");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Login
          </button>
          <div className="flex justify-center">
            <a
              href="/registration"
              className="text-black py-2 px-4 rounded hover:text-blue-600"
            >
              Register
            </a>
          </div>
        </form>
        {message && (
          <p className="mt-3 text-green-600 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

const Login = () => <Example />;

export default Login;