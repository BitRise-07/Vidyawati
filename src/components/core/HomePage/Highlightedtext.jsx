import React from "react";

const Highlightedtext = ({ children }) => {
  return (
    <span className="text-vd-primary text-5xl bg-gradient-to-r from-[#F9872C] to-[#7C41C0] bg-clip-text text-transparent animate-gradient-x">
      {children}
    </span>
  );
};

export default Highlightedtext;
