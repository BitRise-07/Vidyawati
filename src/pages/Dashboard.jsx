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
    <div className="relative min-h-[calc(100vh-64px)] bg-orange-50">
      <Sidebar />

      <div className="w-full lg:pl-[280px]">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
