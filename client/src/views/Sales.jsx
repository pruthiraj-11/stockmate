import { useEffect, useState } from "react";
import axios from "axios";
import AddSaleModal from "../components/AddSaleModal";
import UpdateSaleModal from "../components/UpdateSaleModal";

export default function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [storesData, setStoresData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchSales();
    fetchStores();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/products");
      setProductsData(res.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:4000/sales");
      setSalesData(res.data);
      console.log(res?.data)
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:4000/stores");
      setStoresData(res?.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/sales/${id}`);
      fetchSales();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = (sale) => {
    setSelectedSale(sale);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedSale(null);
  };

  return (
    <>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 className="text-gray-800 font-semibold truncate">Overall Sales</h2>
        {/* ... (Rest of the dashboard cards) */}
      </div>

      <div className="w-full px-4 py-5 my-3 bg-white rounded-lg shadow">
        <div className="overflow-x-auto mt-2">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Sales</h3>
              </div>
              <div className="mt-3 md:mt-0 flex align-middle">
                <AddSaleModal
                  storesData={storesData}
                  productsData={productsData}
                  fetchSales={fetchSales}
                />
              </div>
            </div>
            <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Sale ID</th>
                    <th className="py-3 px-6">Store Name</th>
                    <th className="py-3 px-6">Quantity</th>
                    <th className="py-3 px-6">No. Of Product</th>
                    <th className="py-3 px-6">Total Amount</th>
                    <th className="py-3 px-6">Added Date</th>
                    <th className="py-3 px-6">Modified Date</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {salesData.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item._id.slice(-6)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.store_id.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{
                        item?.quantity?.join(", ") + " (" + item?.quantity?.reduce((acc, cur) => acc + cur, 0) + ")"
                      }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.products_id.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item?.total_sale_amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.createdAt.slice(0, 10)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.updatedAt.slice(0, 10)}</td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateClick(item)}
                          className="py-2 leading-none px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedSale && (
        <UpdateSaleModal
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          sale={selectedSale}
          storesData={storesData}
          productsData={productsData}
          fetchSales={fetchSales}
        />
      )}
    </>
  );
}



{/* <details className="group relative top-2 flex align-middle mr-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center gap-2 pb-1 text-gray-900 transition cursor-pointer">
                    <span className="text-sm font-medium"> Availability </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        // stroke-width="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          // stroke-linecap="round"
                          // stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="z-50 group-open:absolute group-open:top-auto right-0 group-open:mt-2">
                    <div className="bg-white border border-gray-200 rounded w-96">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700">
                          {" "}
                          0 Selected{" "}
                        </span>

                        <button
                          type="button"
                          className="text-sm text-gray-900 underline underline-offset-4"
                        >
                          Reset
                        </button>
                      </header>

                      <ul className="p-4 space-y-1 border-t border-gray-200">
                        <li>
                          <label
                            htmlFor="FilterInStock"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterInStock"
                              className="w-5 h-5 border-gray-300 rounded"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              In Stock (5+)
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterPreOrder"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterPreOrder"
                              className="w-5 h-5 border-gray-300 rounded"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Pre Order (3+)
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterOutOfStock"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterOutOfStock"
                              className="w-5 h-5 border-gray-300 rounded"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Out of Stock (10+)
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </details> */}
{/* <div className="w-full px-4 py-5 my-3 bg-white rounded-lg shadow">
        <div className="flex justify-between align-middle">
          <h2 className=" text-gray-800 font-semibold truncate">History</h2>

          <div className="flex gap-8 align-middle">
            <div className="relative top-2 flex align-middle">
              <details className="group flex align-middle [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center gap-2 pb-1 text-gray-900 transition cursor-pointer">
                  <span className="text-sm font-medium"> Availability </span>

                  <span className="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      // stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        // stroke-linecap="round"
                        // stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="z-50 group-open:absolute group-open:top-auto right-0 group-open:mt-2">
                  <div className="bg-white border border-gray-200 rounded w-96">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {" "}
                        0 Selected{" "}
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>

                    <ul className="p-4 space-y-1 border-t border-gray-200">
                      <li>
                        <label
                          htmlFor="FilterInStock"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterInStock"
                            className="w-5 h-5 border-gray-300 rounded"
                          />

                          <span className="text-sm font-medium text-gray-700">
                            In Stock (5+)
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="FilterPreOrder"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterPreOrder"
                            className="w-5 h-5 border-gray-300 rounded"
                          />

                          <span className="text-sm font-medium text-gray-700">
                            Pre Order (3+)
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="FilterOutOfStock"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterOutOfStock"
                            className="w-5 h-5 border-gray-300 rounded"
                          />

                          <span className="text-sm font-medium text-gray-700">
                            Out of Stock (10+)
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>

            <AddProductModal />
          </div>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Date of Birth
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Salary
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  John Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Developer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Jane Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  04/11/1980
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Designer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $100,000
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Gary Barlow
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Singer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $20,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
