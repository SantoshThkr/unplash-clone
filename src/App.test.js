import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Profile from './components/Profile';
import RepositoryList from './components/RepositoryList';
import { getUser, getRepositories } from './services/githubApi';

jest.mock('./services/githubApi');

const user = {
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231',
  html_url: 'https://github.com/octocat',
  bio: null,
  location: 'San Francisco',
  company: null,
  public_repos: 8,
  followers: 100,
  following: 20,
};

const repos = [
  {
    id: 1,
    name: 'hello-world',
    description: 'My first repository',
    language: 'JavaScript',
    stargazers_count: 25,
    forks_count: 3,
    html_url: 'https://github.com/octocat/hello-world',
  },
];

const search = (name) => {
  fireEvent.change(screen.getByPlaceholderText('Enter GitHub username'), {
    target: { value: name },
  });
  fireEvent.click(screen.getByText('Search'));
};

test('renders search input and lets user type a username', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Enter GitHub username');

  fireEvent.change(input, { target: { value: 'octocat' } });

  expect(input.value).toBe('octocat');
});

test('shows a message when searching with an empty username', () => {
  render(<App />);
  search('   ');

  expect(screen.getByText('Please enter a GitHub username.')).toBeInTheDocument();
  expect(getUser).not.toHaveBeenCalled();
});

test('search button loads and shows the profile', async () => {
  getUser.mockResolvedValue(user);
  getRepositories.mockResolvedValue(repos);

  render(<App />);
  search('octocat');

  expect(screen.getByText('Loading GitHub profile...')).toBeInTheDocument();
  expect(await screen.findByText('The Octocat')).toBeInTheDocument();
  expect(screen.getByText('hello-world')).toBeInTheDocument();
  expect(getUser).toHaveBeenCalledWith('octocat');
});

test('renders profile information', () => {
  render(<Profile profile={user} />);

  expect(screen.getByText('@octocat')).toBeInTheDocument();
  expect(screen.getByText('No bio available.')).toBeInTheDocument();
  expect(screen.getByText('Location: San Francisco')).toBeInTheDocument();
  expect(screen.getByText('Followers: 100')).toBeInTheDocument();
  expect(screen.queryByText(/Company/)).not.toBeInTheDocument();
  expect(screen.getByText('View GitHub Profile')).toHaveAttribute(
    'href',
    'https://github.com/octocat'
  );
});

test('renders repository information', () => {
  render(<RepositoryList repositories={repos} />);

  expect(screen.getByText('hello-world')).toBeInTheDocument();
  expect(screen.getByText('My first repository')).toBeInTheDocument();
  expect(screen.getByText('JavaScript')).toBeInTheDocument();
  expect(screen.getByText('⭐ 25')).toBeInTheDocument();
  expect(screen.getByText('Forks: 3')).toBeInTheDocument();
});

test('shows an error when the user is not found', async () => {
  getUser.mockRejectedValue({ response: { status: 404 } });

  render(<App />);
  search('no-such-user');

  expect(await screen.findByText('GitHub user not found.')).toBeInTheDocument();
});
