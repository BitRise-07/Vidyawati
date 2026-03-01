import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../common/IconButton";
import {
  FaUserCircle,
  FaEdit,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaVenusMars,
  FaBookOpen,
  FaClock,
  FaAward,
  FaGraduationCap,
} from "react-icons/fa";


const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const isStudent = user?.accountType === "Student";

  const formatDate = (dateString) => {
    if (!dateString) return "Not Provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const stats = [
    {
      label: "Enrolled Courses",
      value: user?.courses?.length ?? 0,
      icon: <FaBookOpen className="text-2xl" />,
      bg: "bg-gradient-to-br from-[#f9872c] to-[#f36e14]",
    },
    {
      label: "Hours Learned",
      value: "156",
      icon: <FaClock className="text-2xl" />,
      bg: "bg-gradient-to-br from-[#192f59] to-[#26507a]",
    },
    {
      label: "Certificates",
      value: "8",
      icon: <FaAward className="text-2xl" />,
      bg: "bg-gradient-to-br from-[#7c3aed] to-[#6b21a8]",
    },
  ];

  const details = [
    {
      label: "First Name",
      value: user?.firstName || "Not Provided",
      icon: <FaUserCircle className="text-lg" />,
      accent: "bg-[#fff7ef] text-[#f9872c]",
    },
    {
      label: "Last Name",
      value: user?.lastName || "Not Provided",
      icon: <FaUserCircle className="text-lg" />,
      accent: "bg-[#eff6ff] text-[#2563eb]",
    },
    {
      label: "Email Address",
      value: user?.email || "Not Provided",
      icon: <FaEnvelope className="text-lg" />,
      accent: "bg-[#faf5ff] text-[#7c3aed]",
    },
    {
      label: "Phone Number",
      value: user?.additionalDetail?.contactNumber || "Not Provided",
      icon: <FaPhone className="text-lg" />,
      accent: "bg-[#f0fdf4] text-[#16a34a]",
    },
    {
      label: "Gender",
      value: user?.additionalDetail?.gender || "Not Specified",
      icon: <FaVenusMars className="text-lg" />,
      accent: "bg-[#fff1f2] text-[#db2777]",
    },
    {
      label: "Date of Birth",
      value: formatDate(user?.additionalDetail?.dateOfBirth),
      icon: <FaCalendarAlt className="text-lg" />,
      accent: "bg-[#fffbeb] text-[#f59e0b]",
    },
  ];

  return (
    <div className="animate-fade-in-up max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#192f59] leading-tight">
              My <span className="bg-gradient-to-r from-[#f9872c] to-[#ffa23c] bg-clip-text text-transparent">Profile</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Stats — students only */}
      {isStudent && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl p-5 text-white ${s.bg} shadow-lg transform hover:translate-y-[-4px] transition`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs opacity-90">{s.label}</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{s.value}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {s.icon}
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: i === 0 ? "78%" : i === 1 ? "64%" : "90%" }}
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Main Card */}
      <main className="bg-white rounded-3xl shadow-[0_18px_40px_rgba(25,47,89,0.08)] border border-[#f1f5f9] p-6 md:p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-r from-[#f9872c] to-[#ff9355] p-1.5 shadow-md">
                <img
                  src={user?.image || "https://via.placeholder.com/112"}
                  alt={`${user?.firstName || "User"} profile`}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#192f59]">
                {user?.firstName || "User"} {user?.lastName || ""}
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff7ef] text-[#f9872c] text-sm font-medium">
                  {user?.accountType || "Student"}
                </span>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => navigate("/settings/edit-profile")}
              className="px-4 py-2 rounded-md border border-[#e6eefc] text-[#192f59] bg-white hover:text-vd-primary shadow-sm transition cursor-pointer"
            >
              Manage account
            </button>
          </div>
        </div>

        <div className="border-t border-dashed border-vd-primary my-6 mt-10" />

        {/* About */}
        <section className="mb-8 mt-15">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#fff7ef] flex items-center justify-center">
                <FaUserCircle className="text-[#f9872c] text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#192f59]">About Me</h3>
              </div>
            </div>
            <button
              onClick={() => navigate("/settings/edit-profile")}
              className="text-[#f9872c] hover:text-vd-secondary cursor-pointer font-medium flex items-center gap-2"
            >
              <FaEdit /> Edit About
            </button>
          </div>

          <div className="bg-[#fffaf6] rounded-2xl p-6 border border-[#f7efe6]">
            <p className="text-[#4e5b70] leading-relaxed text-base">
              {user?.additionalDetail?.about || "Tell us about yourself — your goals, strengths, and what you want to learn."}
            </p>
          </div>
        </section>

        {/* Personal Details Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#192f59]">Personal Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.map((d, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-[#f1f5f9] shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${d.accent}`}>
                    {d.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#909399] mb-1">{d.label}</p>
                    <p className="text-base md:text-lg font-semibold text-[#192f59] truncate">{d.value}</p>
                  </div>
                </div>
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-[#eef2ff] to-transparent rounded-full" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Additional Cards — students only */}
      {isStudent && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Learning Progress */}
          <div className="bg-white rounded-3xl p-6 border border-[#eef6ff] shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2b6cb0] to-[#2563eb] flex items-center justify-center">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#192f59]">Learning Progress</h4>
                <p className="text-sm text-[#909399]">Track your course completion</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-[#909399] mb-2">
                  <span>Web Development</span>
                  <span className="font-semibold text-[#192f59]">75%</span>
                </div>
                <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2b6cb0] to-[#2563eb] rounded-full" style={{ width: "75%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-[#909399] mb-2">
                  <span>Data Science</span>
                  <span className="font-semibold text-[#192f59]">45%</span>
                </div>
                <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-[#909399] mb-2">
                  <span>Mobile Development</span>
                  <span className="font-semibold text-[#192f59]">90%</span>
                </div>
                <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#f9872c] to-[#ff7a1a] rounded-full" style={{ width: "90%" }} />
                </div>
              </div>
            </div>

            <button className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border-2 border-[#2b6cb0] text-[#2b6cb0] font-semibold hover:bg-[#f0f8ff] transition">
              View Detailed Progress
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 border border-[#f1f5f9] shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#f9872c] to-[#ff9355] flex items-center justify-center">
                <FaClock className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#192f59]">Quick Actions</h4>
                <p className="text-sm text-[#909399]">Useful links and tools</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="w-full text-left px-4 py-3 rounded-lg border border-[#f1f5f9] hover:shadow-md transition flex items-center gap-3">
                <FaBookOpen className="text-[#192f59]" />
                <div>
                  <p className="text-sm text-[#909399]">My Courses</p>
                  <p className="text-sm font-medium text-[#192f59]">View enrolled courses</p>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 rounded-lg border border-[#f1f5f9] hover:shadow-md transition flex items-center gap-3">
                <FaAward className="text-[#6b21a8]" />
                <div>
                  <p className="text-sm text-[#909399]">Certificates</p>
                  <p className="text-sm font-medium text-[#192f59]">View earned certificates</p>
                </div>
              </button>

              <button
                onClick={() => navigate("/dashboard/settings/change-password")}
                className="w-full text-left px-4 py-3 rounded-lg border border-[#f1f5f9] hover:shadow-md transition flex items-center gap-3"
              >
                <FaLockIconPlaceholder />
                <div>
                  <p className="text-sm text-[#909399]">Change Password</p>
                  <p className="text-sm font-medium text-[#192f59]">Secure your account</p>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 rounded-lg border border-[#f1f5f9] hover:shadow-md transition flex items-center gap-3">
                <FaGraduationCap className="text-[#2563eb]" />
                <div>
                  <p className="text-sm text-[#909399]">Get Mentorship</p>
                  <p className="text-sm font-medium text-[#192f59]">Book a session</p>
                </div>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};


const FaLockIconPlaceholder = () => (
  <div className="w-10 h-10 rounded-lg bg-[#fff7ef] flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-[#f9872c]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.1046 0 2 .8954 2 2v1H10v-1c0-1.1046.8954-2 2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 11V9a5 5 0 10-10 0v2" />
      <rect x="6" y="11" width="12" height="8" rx="2" />
    </svg>
  </div>
);

export default MyProfile;