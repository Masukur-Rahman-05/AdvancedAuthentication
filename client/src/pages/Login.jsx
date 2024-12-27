import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Login } from "@/Redux/AuthSlice/AuthSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Collected Data:", formData);

    const result = await dispatch(Login({ formData }));

    if (result?.payload?.success) {
      
      navigate("/");
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center text-white bg-stone-900">
      <div className="w-[30%] h-auto border-[1px] border-slate-500 p-10 rounded-xl shadow-lg ">
        <h1 className="text-2xl font-bold mb-6 text-center text-">Login</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-5">
            <Label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <Label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password
            </Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end pt-2">
              <p className="text-sm cursor-pointer text-blue-500 hover:underline" onClick={()=>navigate('/auth/forgot-password')}>Forgot Password</p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md"
          >
            Login
          </Button>
        </form>
        <div className="flex gap-3 items-center mt-4 ">
          <p className="text-sm text-gray-500">If you don't have an account, please </p>
          <p onClick={() => navigate("/auth/signup")} className="text-sm cursor-pointer text-blue-500 hover:underline">Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
