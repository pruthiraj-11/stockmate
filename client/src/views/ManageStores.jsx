import { useState, useEffect } from "react";
import AddStore from "../components/AddStore";
import axios from "axios";

export default function ManageStores(params) {
  const [storesData, setStoresData] = useState([]);
  useEffect(() => {
    fetchStores();
  }, [storesData]);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:4000/stores");
      setStoresData(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <div className="w-full px-4 py-5 my-3 bg-white rounded-lg shadow">
      <div className="flex justify-between align-middle">
        <h2 className=" text-gray-800 font-semibold truncate">Manage Stores</h2>

        <AddStore />
      </div>
      <div className="">
        {storesData.map((store) => (
          <div
            key={store._id}
            className="flex flex-col rounded-lg bg-white shadow-lg w-full my-4  md:flex-row"
          >
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src="http://clipart-library.com/image_gallery/n748527.gif"
              alt="Adams Store"
            />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-3xl font-bold text-neutral-800">
                {store.name}
              </h5>
              <p className="mb-4 text-base text-neutral-600 ">
                {store.address}
              </p>
              <span className="text-2xl font-semibold inline-block text-teal-500">
                Cost {store.cost}
              </span>
              <span className="text-2xl font-semibold inline-block text-teal-500">
                Sell {store.sell}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
