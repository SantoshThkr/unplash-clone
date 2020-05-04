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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (name) => {
    setLoading(true);
    setError('');
    setProfile(null);
    setRepositories([]);

    try {
      const user = await getUser(name);
      const repos = await getRepositories(name);
      setProfile(user);
      setRepositories(repos);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('GitHub user not found.');
      } else if (err.response) {
        setError('Unable to load GitHub profile. Please try again.');
      } else {
        setError('Something went wrong. Please check your connection.');
      }
    }

    setLoading(false);
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

      {loading && <p className="status">Loading GitHub profile...</p>}
      {error && <p className="status error">{error}</p>}

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
