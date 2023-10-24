import { ChangeEvent, useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { Link, useSearchParams } from "react-router-dom"
import db from "../../data/db.json"
import { Songs } from '../../Types/SongsTypes';








export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
 const [songs, setSongs] = useState<Songs[]>([])
useEffect(() => {
    setSongs(db.songData);
    console.log(songs)
}, []);

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value });
  };

  const query = searchParams.get("q") ?? "";

  return (
    <div className="flex flex-col items-center justify-center pt-4 bg-bgPrimary">
      <div className="flex bg-white h-12 px-4 py-2 shadow-solidS border-cGray border items-center relative">
        <BiSearch className="h-6 w-6 mr-2" />
        <input
          type="search"
          placeholder="Enter book or author name..."
          value={query}
          onChange={handleQuery}
          className="
            h-full
            w-full
            focus:outline-none
            "
        />
        {query && (
          <div className="bg-white border border-cGray mt-2 max-w-[80%] absolute top-[40px]">
            {songs
              .filter((song:Songs) => {
                return (
                  (song &&
                    song.name.toLowerCase().includes(query.toLowerCase())) 
                    // song.artist.toLowerCase().includes(query.toLowerCase()) ||
                    // song.genre.toLowerCase().includes(query.toLowerCase())||
                );
              })
              .map((song:Songs) => (
                <Link key={song.id} to={`/songs/${song.name}`}>
                  <div className="flex items-center p-2 gap-2">
                    <p>{song.name}</p>
                    <p className="text-xs">{song.artist}</p>
                  </div>
               </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
