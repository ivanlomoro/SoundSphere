import { Songs } from "./SongsTypes"
import { Album } from '../pages/AddMusicPage';

export type GenreType = {
    id: string,
    name: string,
    songs?: Songs[]
    Album: Album[]
}
