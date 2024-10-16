import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Login_Form } from "../../data";
import { useForm } from "react-hook-form";
import { InputErrorMsg } from "../InputErrorMsg";
import axiosInstance from "../config/axios.config";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) toast.success("Login successfully!");
      Cookies.set("Token", res.data.token);
      location.replace('/')
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputs = Login_Form.map((input) => (
    <div key={input.name}>
      <Input
        type={input.type}
        placeholder={input.placeholder}
        {...register(input.name, input.validation)}
      />
      {errors[input.name] && <InputErrorMsg msg={errors[input.name].message} />}
    </div>
  ));

  return (
    <div className="w-5/12 m-auto py-10">
      <h1 className="text-3xl text-center font-semibold mb-6">Login!</h1>
      <form
        className="space-y-4 w-5/6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs}
        <Button isLoading={isLoading}>Login</Button>
      </form>
    </div>
  );
};
