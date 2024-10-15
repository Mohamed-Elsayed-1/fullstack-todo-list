import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { InputErrorMsg } from "../InputErrorMsg";
import axiosInstance from "../config/axios.config";
import { Register_Form } from "../../data";

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const inputs = Register_Form(watch).map((input) => {
    return (
      <div key={input.name}>
        <Input
          placeholder={input.placeholder}
          type={input.type}
          {...register(input.name, input.validation)}
        />
        {errors[input.name] && (
          <InputErrorMsg msg={errors[input.name].message} />
        )}
      </div>
    );
  });
  return (
    <div className="w-5/12 m-auto py-10">
      <h1 className="text-3xl text-center font-semibold mb-6">
        Register to get access!
      </h1>
      <form
        className="space-y-4 w-5/6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs}
        <Button title="Register" />
      </form>
    </div>
  );
};
