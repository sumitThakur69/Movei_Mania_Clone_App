const Category = ({ filters, onFilterChange }) => {
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="flex flex-row gap-3 items-center text-white bg-gray-800 px-4 py-3 rounded-md">
      <label htmlFor="category" className="text-md font-medium">
        Category
      </label>

      <select
        name="category"
        onChange={handleCategoryChange}
        value={filters.category}
        id="category"
        className="bg-gray-700 text-white px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="rating">Rating</option>
        <option value="year">Year</option>
        <option value="title">Title</option>
        <option value="popularity">Popularity</option>
      </select>

      <select
        name="sorting"
        onChange={handleCategoryChange}
        value={filters.sorting}
        id="sorting"
        className="bg-gray-700 text-white px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="sorting">Sorting</option>
        <option value="desc">High to Low</option>
        <option value="asc">Low to High</option>
      </select>
    </div>
  );
};

export default Category;
