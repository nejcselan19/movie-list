const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies(page = 1, genres: number[] = []) {
    const genreParam = genres.length ? `&with_genres=${genres.join(',')}` : '';
    const fetchUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}${genreParam}`;
  
    console.log('Fetching movies from:', fetchUrl);
  
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error('Failed to fetch movies');
    const data = await res.json();
    return data.results;
  }
  

export async function fetchGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error('Failed to fetch genres');
    const data = await res.json();
    return data.genres; // array of { id, name }
  }
  