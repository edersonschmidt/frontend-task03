"use client"

import { useEffect, useState } from 'react'

import SearchBar from '@/app/components/search-bar'
import TextField from '@/components/text-field'
import { Movie } from '@/models/Movie';
import { fetchMovies } from '@/services/api/movies/fetch-movies';
import Catalog from "@/app/components/catalog";
import Loading from "@/components/loading";

export default function Home() {
  const [movies, setMovies] = useState<Movie[] | undefined>();
  const [filteredMovies, setFilteredMovies] = useState<Movie[] | undefined>();

  useEffect(() => {
    const loadList = async () => {
      const movies = await fetchMovies();
      setMovies(movies);
      setFilteredMovies(movies);
    }

    loadList();
  }, [])

  // Filtering logic using frontend only;
  // This is not the best approach, but it works for now

  const handleChangeFilter = (value: string) => {
    if (value === "") {
      // reset the list
      setFilteredMovies(movies);
    } else {
      // Simple filter to search for the title, but could be improved to search for other fields
      // or even use a library like Fuse.js to improve the search
      const filtered = movies?.filter((movie) => {
        return movie.title.toLowerCase().includes(value.toLowerCase());
      })
      setFilteredMovies(filtered);
    }
  }

  const isLoading = !filteredMovies;

  return (
    <main className="flex flex-col min-h-screen gap-4 p-6 lg:p-24 lg:gap-8">
      <SearchBar onChangeFilter={handleChangeFilter} />
      {isLoading && (
        <div className="flex justify-center"><Loading /></div>
      )}
      {filteredMovies && (
        <Catalog movies={filteredMovies || []} />
      )}
    </main>
  )
}
