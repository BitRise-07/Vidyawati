import React from "react";
import { useSelector } from "react-redux";
import SidebarSetting from "../components/core/Settings/SidebarSetting";
import { Outlet } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Spinner from "../components/common/Spinner";

const Setting = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  if (authLoading || profileLoading) {
        return (
          <Spinner />
        );
      }

  return (
    <div className="flex w-max-11/12  min-h-screen bg-orange-50 no-scrollbar overflow-y-auto">
      <SidebarSetting />

      <div className="flex-1 bg-orange-50">
        <div className="mx-auto w-11/12 max-w-[1200px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Setting;
