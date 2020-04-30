import React from 'react';
import Repository from './Repository';

function RepositoryList({ repositories }) {
  const sorted = [...repositories].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

  return (
    <section className="repositories">
      <h2>Repositories</h2>

      {sorted.length === 0 ? (
        <p>No public repositories.</p>
      ) : (
        <ul className="repo-list">
          {sorted.map((repo) => (
            <Repository key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default RepositoryList;
