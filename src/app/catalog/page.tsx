"use client"

import React, { useEffect, useState } from "react"

import CatalogList from "@/app/catalog/components/catalog-list"
import SearchBar from "@/app/catalog/components/search-bar"
import Loading from "@/components/loading"
import { Movie } from "@/models/Movie"
import { fetchMovies } from "@/services/api/movies/fetch-movies"

export default function Catalog() {
  const [movies, setMovies] = useState<Movie[] | undefined>()
  const [filteredMovies, setFilteredMovies] = useState<Movie[] | undefined>()

  useEffect(() => {
    const loadList = async () => {
      const movies = await fetchMovies()
      setMovies(movies)
      setFilteredMovies(movies)
    }

    loadList()
  }, [])

  // Filtering logic using frontend only;
  // This is not the best approach, but it works for now
  const handleChangeFilter = (value: string) => {
    if (value === "") {
      // reset the list
      setFilteredMovies(movies)
    } else {
      // Simple filter to search for the title, but could be improved to search for other fields
      // or even use a library like Fuse.js to improve the search
      const filtered = movies?.filter((movie) => {
        return movie.title.toLowerCase().includes(value.toLowerCase())
      })
      setFilteredMovies(filtered)
    }
  }

  const isLoading = !filteredMovies

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6 lg:gap-8 lg:p-24">
      <SearchBar onChangeFilter={handleChangeFilter} />
      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {filteredMovies && <CatalogList movies={filteredMovies || []} />}
    </main>
  )
}
