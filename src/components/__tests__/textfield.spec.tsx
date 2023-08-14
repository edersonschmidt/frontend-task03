import React from "react"
import { fireEvent, render } from "@testing-library/react"

import TextField from "@/components/textfield"

describe("TextField Component", () => {
  it("renders without any props", () => {
    render(<TextField />)
  })

  it("renders with icon", () => {
    const { container } = render(
      <TextField icon={<div data-testid="test-icon" />} />,
    )
    const icon = container.querySelector("[data-testid='test-icon']")
    expect(icon).toBeInTheDocument()
  })

  it("triggers onChange event", () => {
    const mockOnChange = jest.fn()
    const mockOnClearField = jest.fn()
    const { getByRole } = render(
      <TextField onChange={mockOnChange} onClearField={mockOnClearField} />,
    )

    const input = getByRole("textbox")
    fireEvent.change(input, { target: { value: "Hello" } })
    expect(mockOnChange).toHaveBeenCalledWith("Hello")
  })
})
