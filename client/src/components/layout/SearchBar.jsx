import { useContext, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FilterContext } from "../../contexts/FilterContext.jsx";
import { filterLabel } from "../../functions/layoutFct.js";

const SearchBar = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const [filterToggle, setFilterToggle] = useState(false);
  const handleSearchInputChange = (event) => {
    const newValue = event.target.value;

    // Update all inputs when the search input changes
    const updatedFilter = filter.map((input) => ({
      ...input,
      checked: true,
      value: newValue,
    }));

    setFilter(updatedFilter);
  };

  const handleInputChange = (index, value) => {
    let updatedFilter = [...filter];
    updatedFilter[index].value = value;

    setFilter(updatedFilter);
  };


  const handleCheckBoxChange = (index) => {
    const updatedFilter = [...filter];
    updatedFilter[index].checked = !updatedFilter[index].checked;
    setFilter(updatedFilter);
  };

  return (
    <div className="relative h-full w-full flex items-center gap-4 pl-3 max-md:pl-4 max-md:gap-2 ">
      <div className="flex justify-center items-center gap-2.5">
        <FaMagnifyingGlass className="text-orange" />
        <input
          type="text"
          onChange={handleSearchInputChange}
          className="focus:outline-none w-[400px] font-poppins text-black text-md max-lg:w-[250px] max-md:w-[290px] max-sm:w-[170px]"
          placeholder="Search in all article"
        />
      </div>

      <div className=" flex items-center justify-center">
        <div
          className="px-3 py-2.5 flex items-center justify-center gap-2 cursor-pointer text-gray-800 bg-gray-100 rounded-r-full max-md:px-2"
          onClick={() => setFilterToggle(!filterToggle)}
        >
          <IoIosArrowDown
            className={`mt-0.5 ${filterToggle ? "rotate-180" : ""}`}
          />
        </div>
        {filterToggle && (
          <div className="absolute left-0 mt-0.5 z-10 top-[100%] flex flex-col p-2 w-full gap-1 rounded-xl bg-white shadow-xl">
            {filter.map((item, index) => (
              <div
                key={index}
                className={`flex flex-row justify-start items-center space-x-2 ${item.checked ? '' :'opacity-50'}`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckBoxChange(index)}
                  className="rounded border-gray-300"
                />
                <div className="flex w-full justify-center items-center gap-1.5 bg-grey rounded-md px-1 py-0.5">
                  <p className="font-poppins text-black flex">{item.label}:</p>
                  <input
                    key={index}
                    type="text"
                    id={item.id}
                    placeholder={item.label}
                    value={item.value}
                    className={`focus:outline-none font-poppins bg-grey text-black text-md w-full `}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    disabled={!item.checked}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
