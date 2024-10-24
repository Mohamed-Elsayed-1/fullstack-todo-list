import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { TextArea } from "./TextArea";
import { Button } from "./Button";
import { useForm } from "react-hook-form";
import { InputErrorMsg } from "../InputErrorMsg";
import axiosInstance from "../../config/axios.config";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export const Modal = ({ isOpen, setIsOpen, todo, setReFetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let onSubmit;
  if (todo) {
    onSubmit = async (data) => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.put(`/todo/${todo._id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Token")}`,
          },
        });
        if (res.status === 200) {
          setIsOpen(false);
          toast.success("Edit successfully!");
          setReFetch(Date.now());
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  } else {
    onSubmit = async (data) => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.post(`/todo`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Token")}`,
          },
        });
        if (res.status === 200) {
          setIsOpen(false);
          toast.success("Add successfully!");
          setReFetch(Date.now());
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm bg-black/20"
        >
          <DialogPanel className="w-5/12 space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold text-2xl text-center">
              {todo ? "Edit Todo" : "Add Todo"}
            </DialogTitle>
            <div className="mb-2">
              <Input
                placeholder="title"
                defaultValue={todo ? todo.title : ""}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <InputErrorMsg msg={errors.title.message} />}
            </div>
            <div>
              <TextArea
                placeholder={!todo ? "Description" : ""}
                defaultValue={todo ? todo.description : ""}
                {...register("description")}
              />
            </div>
            <div className="flex gap-4 justify-center">
              <Button isLoading={isLoading}>Save</Button>
              <Button
                onClick={() => setIsOpen(false)}
                bgColor={"rgb(107 114 128 / var(--tw-bg-opacity))"}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </form>
      </Dialog>
    </>
  );
};
