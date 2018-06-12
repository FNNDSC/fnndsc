import axios from 'axios';

export const login = credentials => {
  return axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    // process response somehow
  });
};
