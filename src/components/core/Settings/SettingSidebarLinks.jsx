import React from "react";
import * as FaIcons from "react-icons/fa";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const SettingSidebarLinks = ({ link, iconName, compact = false }) => {
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
        group relative flex items-center gap-3 rounded-xl
        ${compact ? "min-w-max px-3 py-2" : "px-6 py-3 mx-3 my-1"}
        transition-all duration-300
        ${
          isActive
            ? `
              bg-gradient-to-r from-[#1e1e1e] to-[#151515]
              text-white
              shadow-[0_10px_30px_rgba(25,47,89,0.45)]
              ${compact ? "" : "translate-x-1"}
            `
            : `
              text-gray-300
              hover:bg-[#1a1a1a]
              hover:shadow-[0_8px_20px_rgba(25,47,89,0.35)]
              ${compact ? "" : "hover:translate-x-1"}
            `
        }
      `}
    >
      {/* Left glow bar */}
      {isActive && !compact && (
        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-[#F9872C] to-orange-500" />
      )}

      {/* Icon */}
      {Icon && (
        <div
          className={`
            rounded-lg flex items-center justify-center
            ${compact ? "h-8 w-8" : "w-9 h-9"}
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
      {isActive && !compact && (
        <FaChevronRight className="ml-auto text-orange-400 text-xs animate-pulse" />
      )}
    </NavLink>
  );
};

export default SettingSidebarLinks;
