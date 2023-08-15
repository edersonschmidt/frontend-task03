import React from "react"

import SearchBar from "@/app/catalog/components/search-bar"
import { fireEvent, render, waitFor } from "@testing-library/react"
import { useDebounce } from "@uidotdev/usehooks"

// mocking the debounce hook
jest.mock("@uidotdev/usehooks", () => ({
  useDebounce: jest.fn((value) => value),
}))

describe("SearchBar Component", () => {
  it("calls onChangeFilter with debounced text value", async () => {
    const mockOnChangeFilter = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchBar onChangeFilter={mockOnChangeFilter} />,
    )

    const input = getByPlaceholderText("Search for a movie title")

    fireEvent.change(input, { target: { value: "Test Movie" } })

    await waitFor(() => expect(useDebounce).toHaveBeenCalledTimes(2))

    expect(mockOnChangeFilter).toHaveBeenCalledWith("Test Movie")
  })

  it("calls onChangeFilter with empty value when input is cleared", async () => {
    const mockOnChangeFilter = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchBar onChangeFilter={mockOnChangeFilter} />,
    )

    const input = getByPlaceholderText("Search for a movie title")

    fireEvent.change(input, { target: { value: "Test Movie" } })
    fireEvent.change(input, { target: { value: "" } })

    await waitFor(() => expect(useDebounce).toHaveBeenCalledTimes(5))

    expect(mockOnChangeFilter).toHaveBeenCalledWith("")
  })
})
