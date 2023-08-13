interface CardProps {
  coverImageURL: string;
  title: string;
  description: string;
  year: number;
}

function Card({
  coverImageURL,
  year,
  title,
  description
}: CardProps) {

  return (
    <div
      style={{backgroundImage:`url(${coverImageURL})`}}
      className="flex flex-col justify-end p-2 border-2 shadow-inner w-28 h-28 md:w-48 md:h-48 lg:w-64 lg:h-64 group rounded-xl">
      <div className="flex flex-col gap-2 px-2 py-1 text-white bg-black rounded-md bg-opacity-40">
        <div className="flex justify-between">
          <h5 title={title} className="mr-2 text-base font-bold lg:text-lg line-clamp-1 lg:line-clamp-2 text-ellipsis" aria-label="movie title">{title}</h5>
          <span aria-label="movie year" className="hidden text-lg lg:block">{year}</span>
        </div>
        <div className="hidden group-hover:block">
          <p title={description} className="text-sm lg:text-base line-clamp-2 lg:line-clamp-6 text-ellipsis" aria-label="movie description">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
