import React from "react";

const CategoryCard = ({ 
  category, 
  index = 0,
  onClick,
  ...props 
}) => {
  const { name, icon, color, courses, description } = category;

  return (
    <div
      className="relative group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer animate-fade-in-up border border-gray-100"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
      {...props}
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
        {icon}
      </div>
      
      <h3 className="text-lg font-bold text-vd-secondary text-center group-hover:text-vd-primary transition-colors duration-300">
        {name}
      </h3>
      
      {description && (
        <p className="text-sm text-vd-txt text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      )}
      
      {courses && (
        <div className="text-xs text-vd-muted text-center mt-2">
          {courses} courses
        </div>
      )}
      
      <div className="mt-3 flex justify-center items-center text-vd-txt text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Explore</span>
        <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
      </div>
      
      {/* Hover effect background */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
    </div>
  );
};

export default CategoryCard;