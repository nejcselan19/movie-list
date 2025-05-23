import { useEffect, useState, useRef } from 'react';
import { fetchPopularMovies } from '../api/tmdb';
import RatingCircle from './RatingCircle';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

type Props = {
  selectedGenres: number[];
};

function MovieGrid({ selectedGenres }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScroll, setInfiniteScroll] = useState(false);

  const isFirstLoad = useRef(true);
  const scrollLock = useRef(false);

  // Reset movies when genres change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGenres]);

  // Fetch movies when `page` or `selectedGenres` change
  useEffect(() => {
    // Skip first dev double-call
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const newMovies = await fetchPopularMovies(page, selectedGenres);
        if (newMovies.length === 0) {
          setHasMore(false);
        } else {
          setMovies((prev) => {
            const existingIds = new Set(prev.map((m: Movie) => m.id));
            const uniqueMovies = newMovies.filter((m: Movie) => !existingIds.has(m.id));
            return [...prev, ...uniqueMovies];
          });
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
        scrollLock.current = false;
      }
    };

    load();
  }, [page, selectedGenres]);

  // Infinite scroll
  useEffect(() => {
    if (!infiniteScroll || !hasMore) return;

    const handleScroll = () => {
      if (scrollLock.current || loading) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const bottom = document.body.offsetHeight - 300;

      if (scrollPosition >= bottom) {
        scrollLock.current = true;
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [infiniteScroll, loading, hasMore]);

  console.log('Movies:', movies);
  console.log('Page:', page);

  return (
    <div className="w-full min-h-[300px]">
        <div className="grid grid-cols-5 gap-8">
            {movies.map((movie) => (
                <div key={movie.id} className="bg-white/5 rounded-lg overflow-hidden shadow">
                    <div className="relative">
                        <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-[300px] object-cover"
                        />
                        <div className="absolute left-2 bottom-0 translate-y-1/2">
                        <RatingCircle score={movie.vote_average} />
                        </div>
                    </div>

                    <div className="p-3">
                        <h3 className="pt-3 text-sm font-semibold leading-tight mb-1 line-clamp-2">
                        {movie.title}
                        </h3>
                        <p className="text-xs text-gray-400">
                        {new Date(movie.release_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                        </p>
                    </div>
                </div>
            ))}
        </div>


        {movies.length === 0 && !loading && (
            <div className="w-full text-center text-gray-400 mt-20 text-lg">
                No movies found with selected filters.
            </div>
        )}

        {!infiniteScroll && hasMore && (
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => {
                        setPage((p) => p + 1);
                        setTimeout(() => {
                            setInfiniteScroll(true);
                        }, 500);
                    }}
                    className="w-full bg-[#01b4e4] text-white font-bold py-3 rounded-lg transition-none"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            </div>
        )}
    </div>
  );
}

export default MovieGrid;
