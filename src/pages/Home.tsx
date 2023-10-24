

import { NavBar } from '../components'

// import { SearchBar } from '../components/SearchBar/SearchBar'
import { NavbarHome } from '../components/NavBar/NavbarHome'
import { SongList } from './Songs'

export const Home = () => {
  return (
    <>
      <NavbarHome/>
      <SongList/>
      <NavBar/>
      </>

    //<SearchBar/>
    )
}
