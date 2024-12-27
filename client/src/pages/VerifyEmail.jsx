import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { VerifyEmail } from "@/Redux/AuthSlice/AuthSlice.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const handleVerifyEmail = async () => {
    try {
      const result = await dispatch(VerifyEmail({ code: value }));

      if (result?.payload.success) {
        console.log(result.payload);
        navigate("/auth");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-stone-900 flex justify-center items-center text-white ">
      <div className="flex flex-col gap-4">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm">
          {value === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>

        <Button
          className="bg-blue-700 hover:bg-blue-800"
          onClick={handleVerifyEmail}
          disabled={value.length !== 6}
        >
          Verify Email
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
