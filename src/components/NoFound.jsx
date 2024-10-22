import React from 'react';
import { MdGroupOff } from 'react-icons/md';

function NoFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-10 p-6">
      {/* Icon with subtle animation */}
      <MdGroupOff className="text-gray-400 text-7xl animate-bounce" />

      {/* Text styling with better typography */}
      <h1 className="text-gray-500 text-lg md:text-xl font-semibold  animate-pulse">
        No Contacts Found!
      </h1>

      {/* Optional subtext to guide the user */}
      <p className="text-gray-400 text-sm md:text-base mt-2 text-center">
        You can add new contacts by clicking the '+' button above.
      </p>
    </div>
  );
}

export default NoFound;
