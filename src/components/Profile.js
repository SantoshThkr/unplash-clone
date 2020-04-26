import React from 'react';

function Profile({ profile }) {
  return (
    <section className="profile">
      <img className="avatar" src={profile.avatar_url} alt={profile.login} />

      <h2>{profile.name || profile.login}</h2>
      <p className="login">@{profile.login}</p>

      <p className="bio">{profile.bio || 'No bio available.'}</p>

      <ul className="details">
        {profile.location && <li>Location: {profile.location}</li>}
        {profile.company && <li>Company: {profile.company}</li>}
      </ul>

      <div className="stats">
        <span>Repositories: {profile.public_repos}</span>
        <span>Followers: {profile.followers}</span>
        <span>Following: {profile.following}</span>
      </div>

      <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
        View GitHub Profile
      </a>
    </section>
  );
}

export default Profile;
