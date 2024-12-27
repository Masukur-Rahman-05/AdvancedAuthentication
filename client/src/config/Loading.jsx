import React from 'react';
import { PuffLoader } from 'react-spinners';

const Loading = () => {
    return (
      <div className="w-full h-full flex justify-center items-center bg-stone-900">
        <PuffLoader color="#ffffff" />
      </div>
    );
};

export default Loading;