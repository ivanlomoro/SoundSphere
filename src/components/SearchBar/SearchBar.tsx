import { ChangeEvent, useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { Link, useSearchParams } from "react-router-dom"
import db from "../../data/db.json"
import { Songs } from "../../Types/SongsTypes"
import styled from "styled-components"


export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [songs, setSongs] = useState<Songs[]>([])

  const StyledDivSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin: 10px; 
    outline: 1px solid red;
`

const StyledDivSection2 = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
margin: 10px; 
outline: 1px solid red;
`
  const StyledInputSection = styled.input `
    margin: 10px;
    padding: 10px;
    padding-right: 150px;
    background-color: #747474;
    color: white;
  `




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
          <StyledDivSection>
            {songs
              .filter((song: Songs) => {
                return (
                  song && song.name.toLowerCase().includes(query.toLowerCase())
                )
              })
              .map((song: Songs) => (
                <Link key={song.id} to={`/songs/${song.name}`}>
                  <StyledDivSection2>
                    <img style={{width: 50}} src={song.thumbnail} alt="miscojones"/> 
                     <StyledDivSection>
                      <p>{song.name}</p>
                      <p>{song.artist}</p>
                      </StyledDivSection>
                  </StyledDivSection2>
                </Link>
              ))}
          </StyledDivSection>
        )}
      </div>
    </div>
  )
}
