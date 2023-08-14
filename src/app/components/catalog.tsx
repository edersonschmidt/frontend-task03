import React from "react"

import Card from "@/app/components/card"
import Pagination from "@/app/components/pagination"
import usePagination from "@/app/hooks/usePagination"
import { Movie } from "@/models/Movie"

const ITEMS_PER_PAGE = 12
const MAX_PAGE_BUTTONS = 5

interface CatalogProps {
  movies: Movie[]
}

function Catalog({ movies = [] }: CatalogProps) {
  // Pagination logic using frontend only;
  // This is not the best approach, but it works for now
  // Would change to use json-server pagination if I had more time
  // https://github.com/typicode/json-server#paginate
  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination<Movie>({
    items: movies,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  return (
    <>
      {movies.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-500">No movies found</h1>
          <p className="text-gray-400">Try another search</p>
        </div>
      )}
      {movies.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            {currentItems.map((movie) => (
              <Card
                key={`movie-${movie.id}`}
                title={movie.title}
                description={movie.description}
                year={movie.year}
                coverImageURL={movie.coverImage}
              />
            ))}
          </div>
          <Pagination
            maxPageButtonsToShow={MAX_PAGE_BUTTONS}
            totalPages={totalPages}
            currentPage={currentPage}
            onClickPage={goToPage}
            onClickPrev={prevPage}
            onClickNext={nextPage}
          />
        </div>
      )}
    </>
  )
}

export default Catalog
