import { useState } from "react";

type SearchBoxPropsType = {
  onSearchTextChange: (searchText: string) => void;
};

function SearchBox({ onSearchTextChange }: SearchBoxPropsType) {
  const [searchText, setSearchText] = useState("");

  function searchTextChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const searchText = event.target.value;
    setSearchText(searchText);
    onSearchTextChange(searchText);
  }
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Search:</h2>
      <input
        type="text"
        value={searchText}
        onChange={searchTextChangeHandler}
        placeholder="Type to search project by Name or ID"
        className="input input-bordered input-accent w-full "
      />
    </div>
  );
}

export default SearchBox;
