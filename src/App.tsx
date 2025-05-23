import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MovieGrid from './components/MovieGrid';

function App() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) => prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-start p-20 max-w-[1400px] w-full">
        <div className="w-64 bg-white text-black rounded-xl p-4 shadow border border-gray-300 self-start">
          <Sidebar selected={selectedGenres} onToggle={toggleGenre} />
        </div>
        <div className="flex-1 px-4 min-w-0">
          <MovieGrid selectedGenres={selectedGenres} />
        </div>
      </div>
    </div>
  );
  
}

export default App;
