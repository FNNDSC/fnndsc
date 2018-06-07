import axios from 'axios';

export const login = async (credentials: {}) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return response;
  } catch (error) {
    return error;
  }
};

export const getAuthor = async (name: string, credentials: {} = {}) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return { name };
  } catch (error) {
    return error;
  }
};

export const getAuthorPlugins = async (name: string, credentials: {} = {}) => {
  try {
    const allPlugins = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const checkAuthorOfEachPlugin = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return { name };
  } catch (error) {
    return error;
  }
};

export const updateAuthor = async (author: string, payload: {}, credentials: {} = {}) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return { name: author };
  } catch (error) {
    return error;
  }
};
