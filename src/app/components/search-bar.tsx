import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import TextField from "@/components/text-field";
import { useDebounce } from "@uidotdev/usehooks";

interface SearchBarProps {
  onChangeFilter: (v: string) => void;
}

function SearchBar({ onChangeFilter }: SearchBarProps) {
  const [textValue, setTextValue] = useState<string | undefined>();
  const debouncedText = useDebounce(textValue, 500);

  useEffect(() => {
    const changeFilter = async () => {
      onChangeFilter(debouncedText || "")
    };

    changeFilter();
  }, [debouncedText]);

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-3/4">
        <TextField
          id="filter"
          value={textValue}
          placeholder="Search for a movie title"
          icon={<HiOutlineSearch className="w-6 h-6" />}
          onChange={(value) => setTextValue(value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
