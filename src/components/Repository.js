import React from 'react';

function Repository({ repo }) {
  return (
    <li className="repository">
      <h3>{repo.name}</h3>
      {repo.description && <p>{repo.description}</p>}

      <div className="repo-info">
        {repo.language && <span>{repo.language}</span>}
        <span>⭐ {repo.stargazers_count}</span>
        <span>Forks: {repo.forks_count}</span>
      </div>

      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View Repository
      </a>
    </li>
  );
}

export default Repository;
