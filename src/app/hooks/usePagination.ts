import { useEffect, useState } from "react"

interface PaginationOptions<T> {
  items: T[]
  itemsPerPage: number
}

interface PaginationState<T> {
  currentPage: number
  totalPages: number
  currentItems: T[]
}

const usePagination = <T>({ items, itemsPerPage }: PaginationOptions<T>) => {
  // to fix an issue when the items array is updated by filter
  const [savedItems, setSavedItems] = useState<T[]>(items)

  const [pagination, setPagination] = useState<PaginationState<T>>({
    currentPage: 1,
    totalPages: Math.ceil(savedItems.length / itemsPerPage),
    currentItems: savedItems.slice(0, itemsPerPage),
  })

  useEffect(() => {
    if (items !== savedItems) {
      setSavedItems(items)
      setPagination({
        currentPage: 1,
        totalPages: Math.ceil(savedItems.length / itemsPerPage),
        currentItems: savedItems.slice(0, itemsPerPage),
      })
    }
  }, [items, savedItems, itemsPerPage])

  useEffect(() => {
    const startIndex = (pagination.currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = savedItems.slice(startIndex, endIndex)

    setPagination((prevPagination) => ({
      ...prevPagination,
      currentItems,
      totalPages: Math.ceil(savedItems.length / itemsPerPage),
    }))
  }, [savedItems, itemsPerPage, pagination.currentPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        currentPage: page,
      }))
    }
  }

  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      goToPage(pagination.currentPage + 1)
    }
  }

  const prevPage = () => {
    if (pagination.currentPage > 1) {
      goToPage(pagination.currentPage - 1)
    }
  }

  return {
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    currentItems: pagination.currentItems,
    goToPage,
    nextPage,
    prevPage,
  }
}

export default usePagination
