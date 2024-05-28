import Lyout from "../components/lyout/Lyout";
import { useState } from "react";

function Appointement() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
  };
  return (
    <Lyout>
      <section className="p-3 sm:p-5 overflow-y-auto scroll ">
        <div className=" w-full lg:px-12 scroll sm:scroll">
          <div className="bg-whiterelative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-black"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required=""
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="overflow-x-auto ">
              <table className="w-full text-sm text-left text-black ">
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-200 ">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Patient Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Diagnosis
                    </th>
                    <th scope="col" className="px-4 py-3">
                      respiratory support
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ABGs pending
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Downloads pending
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Polygraphy
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Spirometry
                    </th>
                    <th scope="col" className="px-4 py-3">
                      CNAM request pending
                    </th>
                    <th scope="col" className="px-4 py-3">
                      APCI pending
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-black whitespace-nowrap "
                    >
                      hhh
                    </th>
                    <td className="px-4 py-3">ggggggg</td>
                    <td className="px-4 py-3">gggg</td>
                    <td className="px-4 py-3">hhhhhhhh</td>
                    <td className="px-4 py-3">uuuuuu</td>
                    <td className="px-4 py-3">hhhhhhhhhh</td>
                    <td className="px-4 py-3">hhhhhhhhhhhh</td>
                    <td className="px-4 py-3">hhhhhhhhhh</td>
                    <td className="px-4 py-3">hhhhhhhhhhhh</td>

                    <td className="px-4 py-3 flex items-center justify-end ">
                      <button
                        id="DropdownButton"
                        onClick={toggleDropdown}
                        data-dropdown-toggle="DropdownButton"
                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-black hover:text-gray-800 rounded-lg focus:outline-none "
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      <div
                        className={`absolute  mt-16 mr-8 ${
                          isDropdownOpen ? "block" : "hidden"
                        } w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
                        style={{ zIndex: 1000 }}
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="apple-imac-27-dropdown-button"
                        >
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Show
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-black ">
                Showing
                <span className="font-semibold text-gray-900">1-10</span>
                of
                <span className="font-semibold text-gray-900 ">1000</span>
              </span>

              <div className="inline-flex items-stretch -space-x-px">
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Previous
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </Lyout>
  );
}

export default Appointement;
