import axios from 'axios';

export async function movies() {
  try {
    const data = await axios.get('/api/movies');
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}

export const typeActorList = "actor";

export const typeDirectorList = "director";

export async function people(type = typeActorList) {
  try {
    const data = (type === typeActorList) 
      ? await axios.get('/api/cast')
      : await axios.get('/api/directed');
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}
