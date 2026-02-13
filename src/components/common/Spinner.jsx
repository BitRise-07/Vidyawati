import React from "react";

const Spinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-100 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-t-[#F9872C] border-r-[#7C41C0] border-b-[#F9872C] border-l-[#7C41C0] rounded-full absolute top-0 left-0 animate-spin"></div>
        </div>
        <p className="text-vd-secondary font-medium mt-6">Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;
