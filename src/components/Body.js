import { useState } from "react";
import useRestaurantsData from "../utilities/useRestaurantsData";
import Restaurants from "./Restaurants";
import ShimmerHomeUI from "./Shimmer/ShimmerHomeUI";

const Body = () => {
  const [data, setData] = useRestaurantsData();

  const [searchInput, setSearchInput] = useState({
    previousInput: "",
    currentInput: "",
  });

  const handleSearchData = () => {
    const restaurants = data?.savedResData?.filter((item) =>
      item?.info?.name
        ?.toLowerCase()
        .includes(searchInput?.currentInput?.toLowerCase())
    );
    setData((previousData) => ({ ...previousData, resData: restaurants }));
    setSearchInput((previousData) => ({
      ...previousData,
      previousInput: searchInput.currentInput,
      currentInput: "",
    }));
  };

  const handleAllRestaurants = () => {
    setData((previousData) => ({
      ...previousData,
      resData: data?.savedResData,
    }));
  };

  const handleRatingClick = () => {
    const restaurants = data?.savedResData?.filter(
      (item) => item?.info?.avgRating > 4
    );
    setData((previousData) => ({ ...previousData, resData: restaurants }));
  };

  return (
    <div className="w-full mt-16 px-11 flex-col items-center">
      <div className="w-full flex gap-x-12 px-12 mb-10">
        <div className="border rounded-full font-medium overflow-hidden w-4/12 border-gray-300 border-solid">
          <input
            className="border-none text-lg text-gray-600 px-4 py-2.5 w-9/12 outline-none"
            type="text"
            value={searchInput?.currentInput}
            onChange={(e) =>
              setSearchInput((previousData) => ({
                ...previousData,
                currentInput: e.target.value,
              }))
            }
          />
          <button
            className={`w-3/12 px-2 text-lg text-white py-2.5 bg-green-500 ${
              !searchInput?.currentInput && "bg-opacity-60 cursor-not-allowed"
            }`}
            onClick={handleSearchData}
          >
            Search
          </button>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className={`border border-gray-200 border-solid hover:bg-gray-200 transition-all duration-200 ease-in-out rounded-full text-slate-700 text-lg font-medium py-2.5 px-4 `}
            onClick={handleAllRestaurants}
          >
            All Restaurants
          </button>
          <button
            className={`border border-gray-200 border-solid hover:bg-gray-200 transition-all duration-200 ease-in-out rounded-full text-slate-00 text-lg font-medium py-2.5 px-4 `}
            onClick={handleRatingClick}
          >
            Ratings 4.0+
          </button>
        </div>
      </div>
      {data?.savedResData?.length ? (
        data?.resData?.length ? (
          <Restaurants resData={data?.resData} />
        ) : (
          <div className="flex h-96 gap-y-2 flex-col justify-center items-center text-gray-600 font-medium">
            <p className="text-2xl text-slate-700 font-medium">
              We havn't found '{searchInput?.previousInput}' restaurant or may
              be '{searchInput?.previousInput}' doesn't exist!
            </p>
            <p>Visit AllRestaurants or search another restaurant.</p>
          </div>
        )
      ) : (
        <ShimmerHomeUI />
      )}
    </div>
  );
};

export default Body;
