import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import React from "react";
import { Input } from "../ui/Input";
import TextArea from "./TextArea";
import { Button } from "./Button";

export const Modal = ({isOpen,setIsOpen }) => {  
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-5/12 space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold text-2xl text-center">Edit Todo</DialogTitle>
            <div className="mb-2">
              <Input placeholder= 'title'/>
            </div>
            <div>
              <TextArea placeholder="Description"/>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setIsOpen(false)}>Save</Button>
              <Button onClick={() => setIsOpen(false)} bgColor={"rgb(220 38 38 / var(--tw-bg-opacity))"}>Cancel</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
