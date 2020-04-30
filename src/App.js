import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Profile from './components/Profile';
import RepositoryList from './components/RepositoryList';
import { getUser, getRepositories } from './services/githubApi';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async (name) => {
    try {
      const user = await getUser(name);
      const repos = await getRepositories(name);
      setProfile(user);
      setRepositories(repos);
    } catch (err) {
      setProfile(null);
      setRepositories([]);
    }
  };

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

      {profile && (
        <>
          <Profile profile={profile} />
          <RepositoryList repositories={repositories} />
        </>
      )}
    </div>
  );
}

export default App;
