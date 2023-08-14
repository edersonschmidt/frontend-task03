import { Movie } from "@/models/Movie"
import axiosInstance from "@/services/api/config"

export const fetchMoviesEndpoint = {
  path: () => `/movies`,
}

interface FetchMoviesResponse {
  data: Movie[]
}

export const fetchMovies = () =>
  axiosInstance
    .get<never, FetchMoviesResponse>(fetchMoviesEndpoint.path())
    .then((res) => res.data)
