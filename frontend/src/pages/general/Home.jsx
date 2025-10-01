import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GetAllBooks from '../../api/HandleBookApi';
import ViewOption from '../../components/options/ViewOption';

const Home = () => {
  const [view, setView] = useState( sessionStorage.getItem('viewMode')||'table'); // default = table

  const handleViewChange = (newView) => {
    setView(newView);
    sessionStorage.setItem('viewMode', newView); // Save to session storage
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[50vh] bg-gray-300">
        <div>
          {/* Pass state + setter into ViewOption */}
          <ViewOption viewMode={view} onViewChange={handleViewChange} />
          
          {/* Pass view to GetAllBooks if needed */}
          <GetAllBooks view={view} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
