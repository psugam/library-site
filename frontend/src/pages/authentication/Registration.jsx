import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import api from '../../api/AxiosInstance';

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  // ✅ Card shown when already logged in
  const LoggedInCard = () => (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          You are already logged in.
        </h2>
        <p className="text-lg text-gray-700">Redirecting...</p>
      </div>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post(import.meta.env.VITE_REGISTRATION_API, {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        setMessage("Registration successful! Please login with your registered details.");
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.msg || "Registration failed");
      } else {
        setMessage("Server not responding");
      }
    }
  };

  useEffect(() => {
    // If token exists, schedule redirect
    if (localStorage.getItem("token")) {
      const timer = setTimeout(() => setRedirect(true), 2500);
      return () => clearTimeout(timer);
    }

    // If registration success, schedule redirect
    if (message.startsWith("Registration successful")) {
      const timer = setTimeout(() => setRedirect(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle redirects
  if (redirect) {
    // Already logged in → go to /home
    if (localStorage.getItem("token")) {
      return <Navigate to="/home" />;
    }
    // Just registered → go to /login
    return <Navigate to="/login" />;
  }

  // If already logged in, show card first
  if (localStorage.getItem("token")) {
    return <LoggedInCard />;
  }

  // Registration form
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
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
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:text-blue-600 hover:bg-gray-300"
          >
            Register
          </button>
          <div className="flex justify-center">
            <a
              href="/login"
              className="text-black py-2 px-4 rounded hover:text-blue-600"
            >
              Login
            </a>
          </div>
        </form>
        {message && (
          <p className="mt-3 text-green-600 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Registration;
