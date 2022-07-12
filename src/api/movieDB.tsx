import axios from 'axios';
const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '823ff363978c4f6f65beb8436e94e616',
    language: 'es-ES',
  },
});

export default movieDB;
