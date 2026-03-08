import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
import ProgressBar from "@ramonak/react-progress-bar";
import { FaBookOpen, FaClock, FaPlay, FaGraduationCap, FaChevronRight } from "react-icons/fa";

/* ─── Skeleton loader for a single row ─────────────── */
const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 animate-pulse">
    <div className="w-28 h-16 rounded-xl bg-slate-100 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3.5 bg-slate-100 rounded w-2/3" />
      <div className="h-2.5 bg-slate-100 rounded w-1/2" />
    </div>
    <div className="w-24 h-3 bg-slate-100 rounded hidden md:block" />
    <div className="w-32 space-y-2 hidden lg:block">
      <div className="h-2.5 bg-slate-100 rounded w-full" />
      <div className="h-2 bg-slate-100 rounded w-1/2" />
    </div>
  </div>
);

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null); // null = loading
  const navigate = useNavigate();

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const response = await getUserEnrolledCourses();
        setEnrolledCourses(response || []);
      } catch (error) {
        console.log("Unable to fetch Enrolled Courses");
        setEnrolledCourses([]);
      }
    };
    getEnrolledCourses();
  }, []);

  /* ── Empty state ── */
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
        <FaGraduationCap className="text-2xl text-orange-300" />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-700">No enrolled courses yet</p>
        <p className="text-xs text-slate-400 mt-1">Start learning by enrolling in a course today.</p>
      </div>
      <button
        onClick={() => navigate("/courses")}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F9872C] to-orange-400 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      >
        Browse Courses <FaChevronRight className="text-[10px]" />
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Page header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-vd-secondary tracking-tight">
          Enrolled{" "}
          <span className="bg-gradient-to-r from-[#F9872C] to-orange-400 bg-clip-text text-transparent">
            Courses
          </span>
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          {enrolledCourses?.length
            ? `You are enrolled in ${enrolledCourses.length} course${enrolledCourses.length !== 1 ? "s" : ""}`
            : "Track your learning progress here."}
        </p>
      </div>

      {/* ── Main card ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Table header */}
        <div className="bg-gradient-to-r from-[#0f1b3d] to-blue-900 px-6 py-4 hidden md:grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6">
            <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">Course</p>
          </div>
          <div className="col-span-2 text-center">
            <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">Duration</p>
          </div>
          <div className="col-span-4 text-center">
            <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">Progress</p>
          </div>
        </div>

        {/* ── Loading ── */}
        {enrolledCourses === null && (
          <div className="divide-y divide-slate-50">
            {[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
          </div>
        )}

        {/* ── Empty ── */}
        {enrolledCourses !== null && enrolledCourses.length === 0 && <EmptyState />}

        {/* ── Course rows ── */}
        {enrolledCourses?.length > 0 && (
          <div className="divide-y divide-slate-50">
            {enrolledCourses.map((course, index) => {
              const progress = course.progressPercentage || 0;
              const isComplete = progress === 100;

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-orange-50/30 transition-colors duration-150 group"
                >
                  {/* ── Course info ── */}
                  <div className="md:col-span-6 flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="w-28 h-16 rounded-xl object-cover border border-slate-200 group-hover:border-orange-300 transition-colors duration-200"
                      />
                      {/* Play overlay */}
                      <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-200">
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-200 shadow-md">
                          <FaPlay className="text-[#F9872C] text-[9px] ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p
                        className="text-sm font-bold text-slate-800 truncate group-hover:text-[#F9872C] transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate(`/view-course/${course._id}`)}
                      >
                        {course?.courseName}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {course?.courseDescription}
                      </p>
                      {/* Mobile-only badges */}
                      <div className="flex items-center gap-2 mt-1.5 md:hidden">
                        <span className="flex items-center gap-1 text-[10px] text-slate-400">
                          <FaClock className="text-blue-400 text-[9px]" />
                          {course?.totalDuration || "—"}
                        </span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                          isComplete ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-500"
                        }`}>
                          {progress}% {isComplete ? "✓" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Duration ── */}
                  <div className="md:col-span-2 hidden md:flex items-center justify-center gap-1.5">
                    <FaClock className="text-blue-400 text-[11px] shrink-0" />
                    <span className="text-xs font-medium text-slate-500">
                      {course?.totalDuration || "—"}
                    </span>
                  </div>

                  {/* ── Progress ── */}
                  <div className="md:col-span-4 hidden md:block">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {isComplete ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <FaGraduationCap className="text-[10px]" /> Completed
                          </span>
                        ) : (
                          "In Progress"
                        )}
                      </span>
                      <span className={`text-[11px] font-bold tabular-nums ${
                        isComplete ? "text-emerald-600" : "text-[#F9872C]"
                      }`}>
                        {progress}%
                      </span>
                    </div>
                    <ProgressBar
                      completed={progress}
                      height="6px"
                      borderRadius="999px"
                      isLabelVisible={false}
                      bgColor={isComplete ? "#10b981" : "#F9872C"}
                      baseBgColor="#f1f5f9"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Footer ── */}
        {enrolledCourses?.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F9872C]" /> In Progress
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Completed
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;