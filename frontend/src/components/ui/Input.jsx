import React from "react";
import { forwardRef } from "react";

export const Input =forwardRef(({ ...rest },ref) => {
  return (
    <input
      ref={ref}
      className="w-full shadow-lg rounded-lg border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600  p-3  text-md bg-transparent"
      {...rest}
    />
  );
});
