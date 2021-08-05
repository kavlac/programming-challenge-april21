export interface FilmLink{
  id: number,
  film_id: {
    id: number,
    title: string,
    genres: string
  },
  imdb_id: number,
  tmdb_id: number
}
