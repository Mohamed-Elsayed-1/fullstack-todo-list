import React from "react";

export default function TextArea({...rest}) {
  return (
    <textarea
      name=""
      id=""
      rows={5}
      {...rest}
      className="resize-none w-full shadow-lg rounded-lg border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600  p-3  text-md bg-transparent"
    ></textarea>
  );
}
