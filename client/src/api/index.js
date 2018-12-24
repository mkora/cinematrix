import axios from 'axios';

export async function movies() {
  try {
    const data = await axios.get('/api/movies');
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}

// TODO: add constant here
export async function people(type = "actor") {
  try {
    const data = await axios.get('/api/people');;
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}
