import usePagination from "@/app/hooks/usePagination"
import { act, renderHook } from "@testing-library/react-hooks"

describe("usePagination Hook", () => {
  const mockItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  it("returns initial values", () => {
    const { result } = renderHook(() =>
      usePagination({
        items: mockItems,
        itemsPerPage: 3,
      }),
    )

    expect(result.current.currentPage).toBe(1)
    expect(result.current.totalPages).toBe(4)
    expect(result.current.currentItems).toEqual([1, 2, 3])
  })

  it("updates currentPage when calling goToPage", () => {
    const { result } = renderHook(() =>
      usePagination({
        items: mockItems,
        itemsPerPage: 3,
      }),
    )

    act(() => {
      result.current.goToPage(2)
    })

    expect(result.current.currentPage).toBe(2)
  })

  it("updates currentItems when calling nextPage", () => {
    const { result } = renderHook(() =>
      usePagination({
        items: mockItems,
        itemsPerPage: 3,
      }),
    )

    act(() => {
      result.current.nextPage()
    })

    expect(result.current.currentPage).toBe(2)
    expect(result.current.currentItems).toEqual([4, 5, 6])
  })

  it("updates currentItems when calling prevPage", () => {
    const { result } = renderHook(() =>
      usePagination({
        items: mockItems,
        itemsPerPage: 3,
      }),
    )

    act(() => {
      result.current.prevPage()
    })

    expect(result.current.currentPage).toBe(1)
    expect(result.current.currentItems).toEqual([1, 2, 3])
  })

  it("updates currentItems when items array is updated", () => {
    const { result, rerender } = renderHook(
      ({ items, itemsPerPage }) => usePagination({ items, itemsPerPage }),
      {
        initialProps: {
          items: mockItems,
          itemsPerPage: 3,
        },
      },
    )

    expect(result.current.currentItems).toEqual([1, 2, 3])

    const updatedItems = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    rerender({ items: updatedItems, itemsPerPage: 3 })

    expect(result.current.currentPage).toBe(1)
    expect(result.current.totalPages).toBe(4)
    expect(result.current.currentItems).toEqual([11, 12, 13])
  })
})
