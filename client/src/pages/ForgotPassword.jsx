import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ForgotPassword } from '@/Redux/AuthSlice/AuthSlice.js';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const ForgotPasswordPage = () => {

    const dispatch = useDispatch();

    const handleForgotPassword = async () => {
        const result = await dispatch(ForgotPassword({ email }));

        if (result?.payload?.success) {
            alert('An email has been set to the your email');
        }
    };

    const [email, setEmail] = useState('');
    return (
        <div className='w-screen h-screen flex justify-center items-center text-3xl text-white bg-stone-800'>

            <div className='flex flex-col gap-4 w-[30%] text-center'>
                <h1>Enter your Email</h1>

                <div>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button className="mt-5 bg-blue-600" onClick={()=>handleForgotPassword()}>Submit</Button>
                </div>
            </div>
            
        </div>
    );
};

export default ForgotPasswordPage;