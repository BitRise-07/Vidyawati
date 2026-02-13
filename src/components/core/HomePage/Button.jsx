import React from "react";
import { Link } from "react-router-dom";

const Button = ({ 
  children, 
  active = true, 
  linkTo = "/", 
  className = "",
  variant = "primary",
  ...props 
}) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium shadow transition-all duration-300 transform hover:scale-105 cursor-pointer";
  
  const variants = {
    primary: "bg-[#F9872C] text-white hover:bg-vd-secondary",
    secondary: "bg-white text-vd-primary border-2 border-vd-primary hover:bg-vd-primary hover:text-white",
    outline: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-vd-primary"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <Link to={linkTo} className="inline-block">
      <button className={buttonClasses} {...props}>
        <div className="flex items-center justify-center">
          {children}
        </div>
      </button>
    </Link>
  );
};

export default Button;