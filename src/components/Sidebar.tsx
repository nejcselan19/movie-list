import { useEffect, useState } from 'react';
import { fetchGenres } from '../api/tmdb';

type Genre = {
  id: number;
  name: string;
};

type Props = {
  selected: number[];
  onToggle: (genreId: number) => void;
};

export default function Sidebar({ selected, onToggle }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchGenres().then(setGenres).catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Genres</h2>
      <ul className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <li
          key={genre.id}
          onClick={() => onToggle(genre.id)}
          className={`cursor-pointer px-3 py-1 text-sm rounded-full border font-medium transition-all duration-150 ${
            selected.includes(genre.id)
              ? 'bg-[#01b4e4] text-white border-[#01b4e4]'
              : 'bg-white text-black border-gray-300 hover:bg-gray-100'
          }`}
        >
          {genre.name}
        </li>
        
        ))}
      </ul>
    </div>
  );
}
