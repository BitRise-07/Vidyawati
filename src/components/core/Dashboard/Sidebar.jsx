import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
import { FaSignOutAlt, FaCog } from "react-icons/fa";
import Spinner from "../../common/Spinner";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative">
      <aside
        className="
          w-[280px]
          fixed top-[64px]  
          left-0
          h-[calc(100vh-64px)]
          bg-gradient-to-b from-[#192f59] to-[#132547]
          border-r border-[#f9872c]/20
          shadow-[4px_0_25px_rgba(25,47,89,0.35)]
          flex flex-col
          z-40
        "
      >
        {/* USER */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#f9872c] to-orange-500 p-0.5">
              <img
                src={user?.image}
                alt={user?.firstName}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div>
              <p className="text-white font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-orange-200 text-sm capitalize">
                {user?.accountType}
              </p>
            </div>
          </div>
        </div>

        {/* LINKS (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin scrollbar-thumb-orange-400/40 scrollbar-track-transparent">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
              />
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="px-4 py-4 border-t border-white/10 space-y-1">
          <SidebarLink
            link={{ name: "Settings", path: "/settings/edit-profile" }}
            iconName="FaCog"
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text: "Are you sure you want to logout?",
                text2: "You will be logged out of your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="
              w-full flex items-center gap-3 px-4 py-3
              rounded-xl text-orange-200
              hover:bg-white/10 hover:text-white
              transition-all duration-300
            "
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
