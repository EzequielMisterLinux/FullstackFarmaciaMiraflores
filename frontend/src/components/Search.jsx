import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const StyledSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Aquí puedes agregar la lógica para realizar la búsqueda
  };

  return (
    <div className="relative max-w-md mx-auto">
      <div className="flex items-center border-b-2 border-gray-300 py-2">
        <FaSearch className="text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Búsqueda..."
          value={searchTerm}
          onChange={handleSearch}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
      </div>
    </div>
  );
};

export default StyledSearchBar;