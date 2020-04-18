import React, { useState } from 'react';

function SearchBar({ username, setUsername, onSearch }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setMessage('Please enter a GitHub username.');
      return;
    }

    setMessage('');
    onSearch(username.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Search</button>
      {message && <p className="search-message">{message}</p>}
    </form>
  );
}

export default SearchBar;
