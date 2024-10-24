import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { ModalDelete } from "../../components/ui/ModalDelete";

export const TodoBox = ({ todo,setReFetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [todoEdit,setTodoEdit] = useState({})
  function handleModal() {
    setTodoEdit(todo)
    setIsOpen(true);
  }
  function handleModalDelete(){
    setTodoEdit(todo)
    setIsOpenDelete(true)
  }
  return (
    <div className="flex justify-between items-center flex-wrap rounded-lg p-3 odd:bg-gray-200 hover:bg-gray-300">
      <h2 className="flex-1 text-xl ">{todo.title}</h2>
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
          onClick={handleModalDelete}
        >
          Delete
        </Button>
      </div>
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} todo={todoEdit}  setReFetch={setReFetch} />}
      {isOpenDelete && <ModalDelete isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} todo={todoEdit}  setReFetch={setReFetch} />}
    </div>
  );
};
