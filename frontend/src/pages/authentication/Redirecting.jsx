import React from 'react'

const Redirecting = () => {
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
  return (
    <div><LoggedInCard/></div>
  )
}

export default Redirecting