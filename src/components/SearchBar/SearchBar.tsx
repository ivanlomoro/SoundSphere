import { ChangeEvent, useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { Link, useSearchParams } from "react-router-dom"
import db from "../../data/db.json"
import { Songs } from "../../Types/SongsTypes"



export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [songs, setSongs] = useState<Songs[]>([])

  useEffect(() => {
    setSongs(db.songData)
    console.log(songs)
  }, [])

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value })
  }

  const query = searchParams.get("q") ?? ""

  return (
    <div>
      <div>
        <BiSearch />
        <input
          type="search"
          placeholder="Enter song name..."
          value={query}
          onChange={handleQuery}
        />
        {query && (
          <div>
            {songs
              .filter((song: Songs) => {
                return (
                  song && song.name.toLowerCase().includes(query.toLowerCase())
                )
              })
              .map((song: Songs) => (
                <Link key={song.id} to={`/songs/${song.name}`}>
                  <div>
                    <p>{song.name}</p>
                    <p>{song.artist}</p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
