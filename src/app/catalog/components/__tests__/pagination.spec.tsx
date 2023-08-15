import React from "react"

import Pagination from "@/app/catalog/components/pagination"
import { fireEvent, render } from "@testing-library/react"

describe("Pagination Component", () => {
  const mockProps = {
    totalPages: 10,
    currentPage: 3,
    onClickPage: jest.fn(),
    onClickPrev: jest.fn(),
    onClickNext: jest.fn(),
  }

  it("renders correctly with default props", () => {
    const { container, getByText } = render(<Pagination {...mockProps} />)

    const prevButton = getByText("Previous")
    const nextButton = getByText("Next")

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
    expect(container.querySelectorAll("button")).toHaveLength(7) // 5 page buttons + prev + next
  })

  it("calls onClickPrev when Previous button is clicked", () => {
    const { getByText } = render(<Pagination {...mockProps} />)

    const prevButton = getByText("Previous")
    fireEvent.click(prevButton)

    expect(mockProps.onClickPrev).toHaveBeenCalledTimes(1)
  })

  it("calls onClickNext when Next button is clicked", () => {
    const { getByText } = render(<Pagination {...mockProps} />)

    const nextButton = getByText("Next")
    fireEvent.click(nextButton)

    expect(mockProps.onClickNext).toHaveBeenCalledTimes(1)
  })

  it("calls onClickPage with correct page number when a page button is clicked", () => {
    const { getByText } = render(<Pagination {...mockProps} />)

    const pageButton = getByText("5") // Assuming currentPage is 3 and maxPageButtonsToShow is 5
    fireEvent.click(pageButton)

    expect(mockProps.onClickPage).toHaveBeenCalledTimes(1)
    expect(mockProps.onClickPage).toHaveBeenCalledWith(5)
  })

  it("disables Previous button when currentPage is 1", () => {
    const { getByText } = render(<Pagination {...mockProps} currentPage={1} />)

    const prevButton = getByText("Previous")
    expect(prevButton).toBeDisabled()
  })

  it("disables Next button when currentPage is equal to totalPages", () => {
    const { getByText } = render(<Pagination {...mockProps} currentPage={10} />)

    const nextButton = getByText("Next")
    expect(nextButton).toBeDisabled()
  })

  it("disables page button when it matches currentPage", () => {
    const { getByText } = render(<Pagination {...mockProps} />)
    const currentPageButton = getByText("3")
    expect(currentPageButton).toBeDisabled()
  })
})
