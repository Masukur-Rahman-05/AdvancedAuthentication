import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; 

import { Signup } from "@/Redux/AuthSlice/AuthSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

     const [formData, setFormData] = useState({
       name: "",
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
         
         const result = await dispatch(Signup({ formData }));
         
         if (result?.payload?.success) {
           console.log(result.payload.user)

           navigate('/auth/verify-email')
           
         }
       
     };

    
  return (
    <div className="w-screen min-h-screen bg-stone-900 flex justify-center items-center text-white ">
      <div className="w-[30%] h-auto border-[1px] border-slate-500 p-10 rounded-xl shadow-lg ">
        <h1 className="text-2xl font-bold mb-6 text-center text-">Sign Up</h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-5 ">
            <Label htmlFor="name" className="block mb-1 text-sm font-medium">
              Name
            </Label>
            <Input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md"
          >
            Sign Up
          </Button>
        </form>

        <div className="flex gap-3 items-center mt-4 ">
          <p className="text-sm text-gray-500 ">Already have an account?</p>
          <p
            onClick={() => navigate("/auth")}
            className="text-sm cursor-pointer text-blue-500 hover:underline"
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
