import React, { useEffect, useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { useDebounce } from "@uidotdev/usehooks"

import TextField from "@/components/textfield"

interface SearchBarProps {
  onChangeFilter: (value: string) => void
}

function SearchBar({ onChangeFilter }: SearchBarProps) {
  const [textValue, setTextValue] = useState<string | undefined>()
  const debouncedText = useDebounce(textValue, 500)

  useEffect(() => {
    const changeFilter = async () => {
      onChangeFilter(debouncedText || "")
    }

    changeFilter()
  }, [debouncedText])

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-3/4">
        <TextField
          id="filter"
          value={textValue}
          placeholder="Search for a movie title"
          icon={<HiOutlineSearch className="h-6 w-6" />}
          onChange={(value) => setTextValue(value)}
        />
      </div>
    </div>
  )
}

export default SearchBar
