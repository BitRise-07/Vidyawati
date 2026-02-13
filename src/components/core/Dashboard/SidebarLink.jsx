import React from "react";
import * as FaIcons from "react-icons/fa";
import * as VscIcons from "react-icons/vsc";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = FaIcons[iconName] || VscIcons[iconName];
  const location = useLocation();

  if (!Icon) return null;

  const isActive = matchPath({ path: link.path, end: false }, location.pathname);

  return (
    <NavLink
      to={link.path}
      className={`
        group flex items-center gap-4 px-4 py-3 rounded-xl
        transition-all duration-300
        ${
          isActive
            ? "bg-white/10 text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
            : "text-orange-100 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      {/* ICON */}
      <div
        className={`
          w-10 h-10 rounded-lg flex items-center justify-center
          transition-all duration-300
          ${
            isActive
              ? "bg-gradient-to-r from-[#f9872c] to-orange-500 shadow-md"
              : "bg-white/10 group-hover:bg-[#f9872c]"
          }
        `}
      >
        <Icon className="text-lg" />
      </div>

      {/* TEXT */}
      <span className="font-medium tracking-wide">{link.name}</span>

      {/* ACTIVE DOT */}
      {isActive && (
        <span className="ml-auto w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
      )}
    </NavLink>
  );
};

export default SidebarLink;
