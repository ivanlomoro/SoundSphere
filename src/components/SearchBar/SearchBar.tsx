import { ChangeEvent, useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { Link, useSearchParams } from "react-router-dom"
import db from "../../data/db.json"
import { Songs } from "../../Types/SongsTypes"
import styled from "styled-components"

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [songs, setSongs] = useState<Songs[]>([])

  //aplicar estilos...
  const StyledDivSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    with: 100%;
    margin: 10px; 
    outline: 1px solid red;
`
  const StyledInputSection = styled.input `
    margin: 10px;
    padding: 10px;
    padding-right: 150px;
  `

  useEffect(() => {
    setSongs(db.songData)
  }, [])

  console.log(songs)

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value })
  }

  const query = searchParams.get("q") ?? ""

  return (
    <div>
      <div>
        <BiSearch />
        <StyledInputSection
          type="text"
          placeholder="Enter song name..."
          value={query}
          onChange={handleQuery}
        />
        {query && (
          //Aqui cambios 
          <StyledDivSection>  
            {songs
              .filter((song: Songs) => {
                return (
                  song && song.name.toLowerCase().includes(query.toLowerCase())
                )
              })
              .map((song: Songs) => (
                <Link key={song.id} to={`/songs/${song.name}`}>
                  <div>
                    <img src={song.thumbnail} alt="miscojones" />
                    <p>{song.name}</p>
                    <p>{song.artist}</p>
                  </div>
                </Link>
              ))}
          </StyledDivSection>
        )}
      </div>
    </div>
  )
}
