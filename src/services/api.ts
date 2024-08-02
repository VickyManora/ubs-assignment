import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchData = (endpoint: string) => {
  return axios.get(`${BASE_URL}/${endpoint}`);
};