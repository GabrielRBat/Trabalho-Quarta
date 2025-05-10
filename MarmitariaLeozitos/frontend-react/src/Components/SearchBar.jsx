import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value);
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center gap-1 relative justify-center">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Buscar marmita..."
          className="w-full p-1 border border-gray-300 rounded-3xl focus:outline-none"
        />
      </div>

      <button
        onClick={toggleSearch}
        className="flex items-center justify-center h-8 w-8"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
}

export default SearchBar;
