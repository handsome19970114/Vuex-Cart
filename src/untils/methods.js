import axios from 'axios';

const instance = axios.create({
  timeout: 3000,
  baseURL: 'http://localhost:3000',
});

export function get(url, data) {
  return instance.get(url, data);
}
export function post(url, data, config) {
  return instance.post(url, data, config);
}
