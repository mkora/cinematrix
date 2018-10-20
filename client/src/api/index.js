import axios from 'axios';

export async function movies() {
  try {
    const data = await axios.get('/api/movies');
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}

export async function people() {
  try {
    const data = await axios.get('/api/people');;
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}
