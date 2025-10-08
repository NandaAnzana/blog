import React from "react";

type CallbackFunctionSearchString = (searchString: string) => void;

interface SearchProps {
  searchString: string | null;
  setSearchString: CallbackFunctionSearchString;
}

const Search: React.FC<SearchProps> = ({ searchString, setSearchString }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };
  return (
    <div className="flex flex-col w-full">
      <input
        type="text"
        className="flex flex-col px-5 py-3 w-full bg-black text-white rounded-l-full rounded-r-full focus:outline-0"
        placeholder="What are you looking for?"
        value={searchString || ""}
        onChange={handleOnChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.location.replace("/blog/search?q=" + searchString);
          }
        }}
      />
    </div>
  );
};

export default Search;
