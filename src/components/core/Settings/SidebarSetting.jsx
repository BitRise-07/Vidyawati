import React from "react";
import SettingSidebarLinks from "./SettingSidebarLinks";
import { settingMoreLinks } from "../../../data/setting-links";
import { FaCog } from "react-icons/fa";

const SidebarSetting = () => {
  const primaryLinks = [
    { name: "Edit profile", path: "/settings/edit-profile", icon: "FaUser" },
    { name: "Profile Health", path: "/settings/profile-health", icon: "FaHeart" },
    { name: "Change password", path: "/settings/change-password", icon: "FaLock" },
  ];

  return (
    <>
    <nav className="sticky top-16 z-30 border-b border-orange-100 bg-white/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[...primaryLinks, ...settingMoreLinks].map((link) => (
          <SettingSidebarLinks
            key={link.path}
            link={{ name: link.name, path: link.path }}
            iconName={link.icon}
            compact
          />
        ))}
      </div>
    </nav>

    <div className="fixed left-6 top-[96px] hidden h-[calc(100vh-120px)] items-start lg:flex">
      <div
        className="
          w-[300px]
          rounded-2xl
          bg-[#121212]
          border border-[#c7d0e3]/20
          shadow-[0_20px_45px_rgba(25,47,89,0.35)]
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-b border-vd-secondary">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#F9872C] to-orange-500 flex items-center justify-center shadow-md">
              <FaCog className="text-white text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-white">Settings</h2>
          </div>
        </div>

        <div className="py-2">
          <SettingSidebarLinks
            link={{ name: primaryLinks[0].name, path: primaryLinks[0].path }}
            iconName={primaryLinks[0].icon}
          />

          <SettingSidebarLinks
            link={{ name: primaryLinks[1].name, path: primaryLinks[1].path }}
            iconName={primaryLinks[1].icon}
          />

          <SettingSidebarLinks
            link={{ name: primaryLinks[2].name, path: primaryLinks[2].path }}
            iconName={primaryLinks[2].icon}
          />
        </div>

        <div className="mx-6 my-3 h-px bg-vd-secondary" />

        {/* MORE */}
        <div className="px-6 py-2">
          <p className="text-xs text-gray-400 tracking-widest">MORE</p>
        </div>

        <div className="pb-3">
          {settingMoreLinks.map((link) => (
            <SettingSidebarLinks
              key={link.id}
              link={link}
              iconName={link.icon}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default SidebarSetting;
