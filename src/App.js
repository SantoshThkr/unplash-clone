import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState('');

  const handleSearch = (name) => {};

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub Profile Viewer</h1>
        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={handleSearch}
        />
      </header>
    </div>
  );
}

export default App;
