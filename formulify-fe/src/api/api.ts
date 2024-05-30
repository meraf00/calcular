import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/',
});

export const cacheKeys = {
  expressions: 'expressions',
};
