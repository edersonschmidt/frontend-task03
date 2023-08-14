import React from "react";
import { getAllByTestId, render } from "@testing-library/react";

import Catalog from "@/app/components/catalog";
import { Movie } from "@/models/Movie";

describe("Catalog Component", () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Movie 1",
      description: "Description 1",
      year: 2021,
      coverImage: "image1.jpg",
      director: "Director 1",
    },
    {
      id: 2,
      title: "Movie 2",
      description: "Description 2",
      year: 2022,
      coverImage: "image2.jpg",
      director: "Director 2",
    },
  ];

  it("renders 'No movies found' when movies array is empty", () => {
    const { getByText } = render(<Catalog movies={[]} />);

    const noMoviesFoundText = getByText("No movies found");
    expect(noMoviesFoundText).toBeInTheDocument();
  });

  it("renders movies and pagination when there are movies", () => {
    const { getAllByTestId, getByText } = render(<Catalog movies={mockMovies} />);

    const movieCards = getAllByTestId("movie-card");
    const pagination = getByText("Previous");

    expect(movieCards).toHaveLength(mockMovies.length);
    expect(pagination).toBeInTheDocument();
  });
});
