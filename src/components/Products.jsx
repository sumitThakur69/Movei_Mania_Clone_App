import React, { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function ProductCatRow({ category }) {
  return (
    <tr className="bg-gray-200">
      <th colSpan="2" className="text-left px-4 py-2 font-semibold text-gray-700">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked
    ? product.name
    : <span className="text-red-500 font-medium">{product.name}</span>;

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2 text-gray-700">{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCat = null;

  products.forEach((product) => {

    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCat) {
      rows.push(
        <ProductCatRow category={product.category} key={product.category} />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);
    lastCat = product.category;
  });

  return (
    <table className="w-full border border-gray-300 rounded-lg overflow-hidden mt-4 shadow">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="text-left px-4 py-2">Name</th>
          <th className="text-left px-4 py-2">Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ 
  filterText, 
  inStockOnly, 
  onFilterTextChange, 
  onInStockOnlyChange 
}) {
  return (
    <form className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
      <input
        className="border p-2 w-full rounded mb-3"
        placeholder="Search Here"
        type="text"
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />

      <label className="flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
};

function FilterProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />

      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const Products = () => {
  return (
    <div className="p-6">
      <FilterProductTable products={PRODUCTS} />
    </div>
  );
};

export default Products;
