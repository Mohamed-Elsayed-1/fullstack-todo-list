import { Fragment, useEffect, useState } from "react";
import { TodoBox } from "./TodoBox";
import axiosInstance from "../../components/config/axios.config";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const [todoBoxes, setTodoBoxes] = useState([]);
  const token = Cookies.get("Token");
  const { isLoading, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    },
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
    );

  return (
    <div className="mt-5">
      {data ? (
        data.map((el) => (
          <Fragment key={el._id}>
            <TodoBox title={el.title} />
          </Fragment>
        ))
      ) : (
        <h3 className="text-center text-gray-500 text-lg font-semibold">
          Todo Not Found
        </h3>
      )}
    </div>
  );
};
