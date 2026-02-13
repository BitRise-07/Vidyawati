import React from "react";
import * as FaIcons from "react-icons/fa";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const SettingSidebarLinks = ({ link, iconName }) => {
  const Icon = FaIcons[iconName];
  const location = useLocation();

  const isActive = matchPath(
    { path: link.path, end: false },
    location.pathname
  );

  return (
    <NavLink
      to={link.path}
      className={`
        group relative flex items-center gap-4
        px-6 py-3 mx-3 my-1 rounded-xl
        transition-all duration-300
        ${
          isActive
            ? `
              bg-gradient-to-r from-[#1e1e1e] to-[#151515]
              text-white
              shadow-[0_10px_30px_rgba(25,47,89,0.45)]
              translate-x-1
            `
            : `
              text-gray-300
              hover:bg-[#1a1a1a]
              hover:shadow-[0_8px_20px_rgba(25,47,89,0.35)]
              hover:translate-x-1
            `
        }
      `}
    >
      {/* Left glow bar */}
      {isActive && (
        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-[#F9872C] to-orange-500" />
      )}

      {/* Icon */}
      {Icon && (
        <div
          className={`
            w-9 h-9 rounded-lg flex items-center justify-center
            transition-all duration-300
            ${
              isActive
                ? "bg-gradient-to-r from-[#F9872C] to-orange-500 shadow-md"
                : "bg-white/10 group-hover:bg-white/20"
            }
          `}
        >
          <Icon className={`text-sm ${isActive ? "text-white" : "text-gray-300"}`} />
        </div>
      )}

      {/* Label */}
      <span className="text-sm tracking-wide">{link.name}</span>

      {/* Arrow (active only) */}
      {isActive && (
        <FaChevronRight className="ml-auto text-orange-400 text-xs animate-pulse" />
      )}
    </NavLink>
  );
};

export default SettingSidebarLinks;
