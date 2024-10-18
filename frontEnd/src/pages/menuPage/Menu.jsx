import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
// import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductMutation } from "../../state/products/productsApi";
import { useSearchParams } from "react-router-dom";
import { key } from "localforage";
import Navbar from "../../components/Navbar";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [Product, setProduct] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const { products } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page
  const [getProduct, { data: Products, isSuccess, isLoading }] =
    useGetProductMutation();
  const [searchparams] = useSearchParams();
  const [linkIndex, setLinkIndex] = useState(0);
  const [temporary, setTemprary] = useState([]);
  const category = searchparams.get("category");

  useEffect(() => {
    // Fetch data from the backend

    try {
      if (!products) {
        getProduct();
      } else {
        setProduct(products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    if (products) {
      const filteredProduct = products.filter(
        (item) => item.category === category
      );

      setMenu(filteredProduct);
      setFilteredItems(filteredProduct);
      setTemprary([]); // Initially, display all items
    }
  }, [category]);

  const filterItems = (brand) => {
    const filtered = menu.filter((item) => item.brand === brand);

    setFilteredItems(filtered);
    setSelectedCategory(brand);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-to-high":
        sortedItems.sort(
          (a, b) => a.productDetail[0].price - b.productDetail[0].price
        );
        break;
      case "high-to-low":
        sortedItems.sort(
          (a, b) => b.productDetail[0].price - a.productDetail[0].price
        );
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //   console.log(filteredItems);
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="pt-40 flex flex-col items-center justify-center">
          {/* menu shop   */}
          <div className="section-container">
            <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8 mt-10 py-10">
              {/* all category buttons */}
              <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
                <button
                  onClick={showAll}
                  className={selectedCategory === "all" ? "active" : ""}
                >
                  All
                </button>
                {menu.map((item, i) => {
                  const exist = temporary.filter((temp) => temp === item.brand);

                  if (exist.length < 1) {
                    temporary.push(item.brand);
                    console.log(temporary);
                  }
                })}
                {temporary.map((item, i) => (
                  <button
                    onClick={() => filterItems(item)}
                    className={selectedCategory === item ? "active" : ""}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* filter options */}
              <div className="flex justify-end mb-4 rounded-sm">
                <div className="bg-black p-2 ">
                  {/* <FaFilter className="text-white h-4 w-4" /> */}
                </div>
                <select
                  id="sort"
                  onChange={(e) => handleSortChange(e.target.value)}
                  value={sortOption}
                  className="bg-black text-white px-2 py-1 rounded-sm"
                >
                  <option value="default"> Default</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="high-to-low">High to Low</option>
                </select>
              </div>
            </div>

            {/* product card */}
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
              {filteredItems.map((item, index) => (
                <Cards key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center my-8 flex-wrap gap-2">
            {Array.from({
              length: Math.ceil(filteredItems.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-green text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
