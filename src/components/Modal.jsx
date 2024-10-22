import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";

function Modal({ isOpen, isClose, children }) {
  const handleBackdropClick = (e) => {
  
    if (e.target === e.currentTarget) {
      isClose();
    }
  };

  return (
    <>
      {isOpen && (
        <>
         
          <div
            onClick={handleBackdropClick} 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          >
           
            <div
              className="relative bg-white text-black p-6 rounded-lg shadow-lg max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl min-h-[200px] w-full"
            >
              <IoMdCloseCircle
                className="absolute top-2 right-2 text-3xl cursor-pointer"
                onClick={isClose}
              />
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Modal;
