import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const Login = () => {
  return (
    <div className="w-5/12 m-auto  text-center py-10">
      <h1 className="text-3xl font-semibold mb-6">Login!</h1>
      <div className="space-y-3">
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button title="Login" />
      </div>
    </div>
  );
};
