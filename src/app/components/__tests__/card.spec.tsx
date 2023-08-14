import React from "react"

import Card from "@/app/components/card"
import { render } from "@testing-library/react"

describe("Card Component", () => {
  const mockCardProps = {
    coverImageURL: "mock-image-url.jpg",
    title: "Mock Title",
    description: "Mock Description",
    year: 2023,
  }

  it("renders with provided props", () => {
    const { getByLabelText } = render(<Card {...mockCardProps} />)

    const titleElement = getByLabelText("movie title")
    const yearElement = getByLabelText("movie year")
    const descriptionElement = getByLabelText("movie description")

    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent(mockCardProps.title)

    expect(yearElement).toBeInTheDocument()
    expect(yearElement).toHaveTextContent(mockCardProps.year.toString())

    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement).toHaveTextContent(mockCardProps.description)
  })

  it("renders background image correctly", () => {
    const { container } = render(<Card {...mockCardProps} />)
    const cardContainer = container.querySelector(".group")

    expect(cardContainer).toHaveStyle(
      `backgroundImage: url(${mockCardProps.coverImageURL})`,
    )
  })

  it("hides description by default and shows on hover", () => {
    const { getByLabelText, container } = render(<Card {...mockCardProps} />)
    const descriptionElement = getByLabelText("movie description")

    container.firstChild?.dispatchEvent(new MouseEvent("mouseover"))

    expect(descriptionElement).not.toHaveClass("hidden")
  })
})
