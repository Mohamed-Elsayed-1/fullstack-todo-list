import { Fragment, useEffect, useState } from "react";
import { TodoBox } from "./TodoBox";
import axiosInstance from "../config/axios.config";
import Cookies from "js-cookie";

export const Home = () => {
  const [todoBoxes, setTodoBoxes] = useState([]);
  const token = Cookies.get("Token");
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axiosInstance.get("/todo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data) {
          const boxes = data.data.map((el) => (
            <Fragment key={el._id}>
              <TodoBox key={el.id} title={el.title} />
            </Fragment>
          ));
          setTodoBoxes(boxes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchTodo();
    }
  }, [token]);

  return (
    <div className="mt-5">
      {todoBoxes.length > 0 ? (
        todoBoxes
      ) : (
        <h3 className="text-center text-gray-500 text-lg font-semibold">
          Todo Not Found
        </h3>
      )}
    </div>
  );
};
