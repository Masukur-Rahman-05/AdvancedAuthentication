
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResetPassword } from '@/Redux/AuthSlice/AuthSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const { token } = useParams()
    
    
    
    const handleResetPassword = async () => {
        const result = await dispatch(ResetPassword({ token, password }));

        if (result?.payload?.success) {
            alert("Password reset successful");
            navigate("/auth");
        }
    }
    return (
      <div className="w-screen h-screen flex justify-center items-center text-3xl text-white bg-stone-800">
        <div className="flex flex-col gap-4 w-[30%] text-center">
          <h1>Enter your new password</h1>

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="mt-5 bg-blue-600"
              onClick = {()=>handleResetPassword()}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    );
};

export default ResetPasswordPage;