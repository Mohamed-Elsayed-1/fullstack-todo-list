import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "./Button";
import axiosInstance from "../../config/axios.config";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useState } from "react";
export const ModalDelete = ({ isOpen, setIsOpen, todo,setReFetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(`/todo/${todo._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("Token")}`,
        },
      });
      if (res.status === 200) {
        setIsOpen(false);
        toast.success("Delete successfully!");
        setReFetch(Date.now());
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        <div
          className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm bg-black/20"
        >
          <DialogPanel className="w-5/12  border bg-white p-12">
            <DialogTitle className="font-bold text-2xl">
              Are you sure you want to remove this todo from your Store ?
            </DialogTitle>
            <p className="text-sm text-gray-500 my-6">
              Deleting this Todo will remove it permanently from your inventory.
              Any associated data, sales history, and other related information
              will also be deleted. Please make sure this is the intended
              action.
            </p>
            <div className="flex gap-4 justify-center">
              <Button bgColor={"rgb(220 38 38 / var(--tw-bg-opacity))"} isLoading={isLoading} onClick={handleSubmit}>
                Ok
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                bgColor={"rgb(107 114 128 / var(--tw-bg-opacity))"}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
