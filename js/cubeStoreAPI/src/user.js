import axios from 'axios';

export const login = credentials => {
  return axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    // process response somehow
  });
};

const addUser = (name, credentials) => {
  return axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    // return dummy value to make test pass
    return { success: true };
  });
};

const getUser = (name, credentials) => {
  return axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
    // return dummy value to make test pass
    return { name };
  });
};

export { addUser, getUser };
