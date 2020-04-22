import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const getUser = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

export const getRepositories = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}/repos`, {
    params: { per_page: 100 },
  });
  return response.data;
};
