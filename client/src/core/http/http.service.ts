import axios from 'axios';

export const API_PATH = import.meta.env.VITE_API_HOST;
if (API_PATH === undefined) {
  console.error('VITE_API_HOST is not set');
}
const instance = axios.create({
  baseURL: API_PATH,
  headers: {
    'Content-type': 'application/json',
  },
});

export default instance;
