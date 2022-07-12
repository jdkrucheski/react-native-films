import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {MovieDBResponse, Movie} from '../interfaces/movieInterface';

interface StatesMovies {
  nowPlaying: Movie[];
  popular: Movie[];
  topRate: Movie[];
  upcoming: Movie[];
}
export const useMovies = () => {
  const [moviesState, setMoviesState] = useState<StatesMovies>({
    nowPlaying: [],
    popular: [],
    topRate: [],
    upcoming: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');
    const popularPromise = movieDB.get<MovieDBResponse>('/popular');
    const topRatedPromise = movieDB.get<MovieDBResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBResponse>('/upcoming');
    const res = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);
    setMoviesState({
      nowPlaying: res[0].data.results,
      popular: res[1].data.results,
      topRate: res[2].data.results,
      upcoming: res[3].data.results,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
