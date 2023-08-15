import React from "react"

interface CardProps {
  coverImageURL: string
  title: string
  description: string
  year: number
}

function Card({ coverImageURL, year, title, description }: CardProps) {
  return (
    <div
      data-testid="movie-card"
      style={{ backgroundImage: `url(${coverImageURL})` }}
      className="group flex h-28 w-28 flex-col justify-end rounded-xl border-2 p-2 shadow-inner md:h-48 md:w-48 lg:h-64 lg:w-64"
    >
      <div className="flex flex-col gap-2 rounded-md bg-black bg-opacity-40 px-2 py-1 text-white">
        <div className="flex justify-between">
          <h5
            title={title}
            className="mr-2 line-clamp-1 text-ellipsis text-base font-bold lg:line-clamp-2 lg:text-lg"
            aria-label="movie title"
          >
            {title}
          </h5>
          <span aria-label="movie year" className="hidden text-lg lg:block">
            {year}
          </span>
        </div>
        <div className="hidden group-hover:block">
          <p
            title={description}
            className="line-clamp-2 text-ellipsis text-sm lg:line-clamp-6 lg:text-base"
            aria-label="movie description"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
