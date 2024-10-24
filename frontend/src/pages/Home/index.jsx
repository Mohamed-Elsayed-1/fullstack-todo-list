import { Fragment, useState } from "react";
import { TodoBox } from "./TodoBox";
import Cookies from "js-cookie";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { Modal } from "../../components/ui/Modal";

export const Home = () => {
  const token = Cookies.get("Token");
  const [reFetch, setReFetch] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data } = useCustomQuery({
    queryKey: ["todoList", reFetch],
    url: "/todo",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const addTodo = () => {
    setIsOpen(true)
  };

  return (
    <div className="mt-5 space-y-1">
      <button
        className="block bg-green-600 w-40 ml-auto my-5 text-white py-2 p-4 rounded-lg hover:bg-green-500"
        onClick={addTodo}
      >
        Add Todo
      </button>
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
      ) : data ? (
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
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setReFetch={setReFetch}
        />
      )}
    </div>
  );
};
