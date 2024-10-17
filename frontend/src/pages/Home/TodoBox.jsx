import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";

export const TodoBox = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  function handleModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex justify-between items-center flex-wrap rounded-lg p-3 even:bg-gray-200 hover:bg-gray-300">
      <h2 className="flex-1 text-xl ">{title}</h2>
      <div className="flex gap-2">
        <Button
          bgColor={"bg-indigo-600"}
          customPadding={"5px 1.1rem"}
          customFont={"14px"}
          onClick={handleModal}
        >
          Edit
        </Button>
        <Button
          bgColor={"rgb(220 38 38 / var(--tw-bg-opacity))"}
          customPadding={"5px 1.1rem"}
          customFont={"14px"}
        >
          Delete
        </Button>
      </div>
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};
