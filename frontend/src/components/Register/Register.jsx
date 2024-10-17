import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { InputErrorMsg } from "../InputErrorMsg";
import axiosInstance from "../../config/axios.config";
import { Register_Form } from "../../data";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 200) toast.success("Register successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
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
    <div className="py-10">
      <h1 className="text-3xl text-center font-semibold mb-6">
        Register to get access!
      </h1>
      <form
        className="space-y-4 w-5/6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs}
        <Button isLoading={isLoading}>Register</Button>
      </form>
    </div>
  );
};
