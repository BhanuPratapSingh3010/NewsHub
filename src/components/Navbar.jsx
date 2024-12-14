import React, { useContext, useRef, useState } from 'react';
import NewsContext from '../context/NewsContext';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const store = useContext(NewsContext);
  const searchRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = searchRef.current.value.trim();
    if (searchTerm) {
      store.setNews(searchTerm);
      searchRef.current.value = '';
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Logo + Links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold whitespace-nowrap">
            News<span className="text-blue-500">Hub</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
            <button onClick={() => store.setNews('world')} className="hover:text-blue-400">
              World
            </button>
            <button onClick={() => store.setNews('politics')} className="hover:text-blue-400">
              Politics
            </button>
            <button onClick={() => store.setNews('business')} className="hover:text-blue-400">
              Business
            </button>
            <button onClick={() => store.setNews('technology')} className="hover:text-blue-400">
              Technology
            </button>
            <button onClick={() => store.setNews('sports')} className="hover:text-blue-400">
              Sports
            </button>
            <button onClick={() => store.setNews('entertainment')} className="hover:text-blue-400">
              Entertainment
            </button>
            <button onClick={() => store.setNews('science')} className="hover:text-blue-400">
              Science
            </button>
          </div>
        </div>

        {/* Right Section: Search + Mobile Controls */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-2">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search news..."
              className="p-2 rounded-md text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center">
            {/* Mobile Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white text-xl mr-4"
            >
              <FaSearch />
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="mt-2 md:hidden px-4">
          <div className="flex items-center gap-2">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search news..."
              className="p-2 rounded-md w-full text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="bg-gray-800 mt-2 p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
            <button onClick={() => store.setNews('world')} className="hover:text-blue-400">
              World
            </button>
            <button onClick={() => store.setNews('politics')} className="hover:text-blue-400">
              Politics
            </button>
            <button onClick={() => store.setNews('business')} className="hover:text-blue-400">
              Business
            </button>
            <button onClick={() => store.setNews('technology')} className="hover:text-blue-400">
              Technology
            </button>
            <button onClick={() => store.setNews('sports')} className="hover:text-blue-400">
              Sports
            </button>
            <button onClick={() => store.setNews('entertainment')} className="hover:text-blue-400">
              Entertainment
            </button>
            <button onClick={() => store.setNews('science')} className="hover:text-blue-400">
              Science
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
