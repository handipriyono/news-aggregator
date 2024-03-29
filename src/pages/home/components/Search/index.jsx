const Search = ({ onSearch, search }) => {
  return (
    <div className="flex gap-3 pr-4">
      <input
        id="search"
        name="search"
        type="text"
        onChange={onSearch}
        value={search}
        autoComplete="text"
        className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Enter your keyword..."
      />
      <button
        type="submit"
        className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
