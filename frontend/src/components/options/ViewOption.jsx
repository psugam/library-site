import React from "react";

const ViewOption = ({ viewMode, onViewChange }) => {
  const handleChange = (e) => {
    onViewChange(e.target.value);
  };

  return (
    <div className="flex justify-center mb-6">
      <select
        className="text-black border-2 border-black rounded px-2 py-1"
        value={viewMode}
        onChange={handleChange}
      >
        <option value="table">Table View</option>
        <option value="grid">Grid View</option>
      </select>
    </div>
  );
};

export default ViewOption;
