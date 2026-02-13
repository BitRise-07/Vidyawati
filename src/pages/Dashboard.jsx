import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { FaSpinner } from "react-icons/fa";
import Spinner from "../components/common/Spinner";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative flex min-h-screen bg-orange-50 ">
      <Sidebar />

      <div className="flex-1 h-screen overflow-auto">
        <div className="mx-auto  w-11/12 py-10 pl-70">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
