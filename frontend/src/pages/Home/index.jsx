import { Fragment, useState } from "react";
import { TodoBox } from "./TodoBox";
import Cookies from "js-cookie";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { Modal } from "../../components/ui/Modal";
import { faker } from "@faker-js/faker";
import axiosInstance from "../../config/axios.config";

export const Home = () => {
  const token = Cookies.get("Token");
  const [reFetch, setReFetch] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize,setPageSize ]=useState(5);
  const { isLoading, data } = useCustomQuery({
    queryKey: ["todoList", reFetch, page,pageSize],
    url: `/todo/?page=${page}&limit=${pageSize}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const addTodo = () => {
    setIsOpen(true);
  };

  // const generateTodos = async () => {
  //   for (let i = 0; i < 100; i++) {
  //     try {
  //       await axiosInstance.post(
  //         `/todo`,
  //         {
  //           title: `${faker.word.words(5)}`,
  //           description: `${faker.lorem.paragraph(2)}`,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${Cookies.get("Token")}`,
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   setReFetch({}); // Trigger refetch after generating todos
  // };

  const changePageSize = (e)=>{
    setPageSize(e.target.value)
  }

  return (
    <div className="mt-5 space-y-1">
      <div className="flex gap-2 justify-between items-center">
        <button
          className="block border-2 border-indigo-700 text-indigo-700 w-40 my-5 hover:text-white py-2 p-4 rounded-lg hover:bg-indigo-700"
          onClick={addTodo}
        >
          Add Todo
        </button>
        <select className="border-2 border-indigo-600 w-40 h-11 rounded-md" onChange={changePageSize}>
          <option disabled>Page Size</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        {/* <button
          className="block border-solid border-2 border-green-600 w-40 my-5 text-green-600 py-2 p-4 rounded-lg hover:bg-green-600 hover:text-white"
          onClick={generateTodos}
        >
          Generate
        </button> */}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-700 mt-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : data && data.length > 0 ? (
        data.map((todo) => (
          <Fragment key={todo._id}>
            <TodoBox todo={todo} setReFetch={setReFetch} />
          </Fragment>
        ))
      ) : (
        <h3 className="text-center text-gray-500 text-lg font-semibold">
          Todo Not Found
        </h3>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} setReFetch={setReFetch} />
      )}
      <div className="flex justify-center pt-3">
        <div className="flex">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1 || isLoading}
            className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
          </button>
          <span className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500">
            Page {page}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={(data && data.length < 5) || isLoading}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
          </button>
        </div>
      </div>
    </div>
  );
};
