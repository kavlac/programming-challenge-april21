export interface Rating{
  id: number,
  film_id: {
      id: number,
      title: string,
      genres: string
  },
  rating: number
}
