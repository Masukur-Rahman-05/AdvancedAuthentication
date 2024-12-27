import { Button } from "@/components/ui/button";
import { Logout } from "@/Redux/AuthSlice/AuthSlice.js";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Home = () => {

  const dispatch = useDispatch();

  const handleLogout = async () => {
     dispatch(Logout());
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-3xl text-white bg-stone-800">
      This is Home
      
      <Button onClick={()=>handleLogout()} className="mt-5 bg-blue-600">
        Logout
      </Button>
    </div>
  );
};

export default Home;
