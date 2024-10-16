import React from "react";
import {Button} from "../ui/Button";
export const TodoBox = ({title}) => {
  return (
    <div className="flex justify-between items-center flex-wrap w-5/12 rounded-lg mx-auto p-3 even:bg-gray-200">
      <h2 className="flex-1 text-xl ">{title}</h2>
      <div className="flex gap-2">
        <Button bgColor={"bg-indigo-600"} customPadding={'5px 1.1rem'} customFont={'14px'}>Edit</Button>
        <Button bgColor={"rgb(220 38 38 / var(--tw-bg-opacity))"} customPadding={'5px 1.1rem'} customFont={'14px'}>
          Delete
        </Button>
      </div>
    </div>
  );
};
