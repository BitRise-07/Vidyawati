import React, { useState } from "react";
import { FaRegEdit, FaEye, FaClock, FaRupeeSign, FaCalendarAlt, FaTag, FaPlus, FaUsers } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsApi";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { COURSE_STATUS } from "../../../../utils/constants";

/* ─── Status badge ─────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const isPublished = status === COURSE_STATUS.PUBLISHED;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
      isPublished
        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
        : "bg-orange-50 text-orange-500 border-orange-200"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-orange-400"}`} />
      {isPublished ? "Published" : "Draft"}
    </span>
  );
};

/* ─── Icon action button ───────────────────────────── */
const ActionBtn = ({ onClick, disabled, title, color, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none ${color}`}
  >
    {children}
  </button>
);

const CourseTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  console.log("courses: ", courses)

  const handleDeleteCourse = async (courseId) => {
    setLoading(true);
    await deleteCourse(courseId);
    const result = await fetchInstructorCourses();
    if (result) setCourses(result);
    setConfirmationModal(null);
    setLoading(false);
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  const formatPrice = (price) =>
    price
      ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(price)
      : "Free";

  /* ── Empty state ── */
  if (!courses?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-orange-50 border border-slate-100 shadow-sm text-center gap-4">
        <div className="w-16 h-16  bg-orange-50 border border-orange-100 flex items-center justify-center">
          <FaEye className="text-2xl text-orange-300" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-700 mb-1">No courses yet</h3>
          <p className="text-sm text-slate-400 max-w-xs">Create your first course and start sharing your knowledge.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F9872C] to-orange-400 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <FaPlus className="text-xs" /> Create Course
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white  border border-slate-200 shadow-sm overflow-hidden">

      {/* ── Panel header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-[#0f1b3d] to-blue-900">
        <div>
          <h2 className="text-base font-bold text-white">My Courses</h2>
          <p className="text-xs text-blue-300 mt-0.5">{courses.length} course{courses.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex items-center gap-2 px-4 py-2 bg-[#F9872C] hover:bg-orange-400 text-white text-xs font-bold rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <FaPlus className="text-[10px]" /> New Course
        </button>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <Thead>
            <Tr className="border-b border-slate-100 bg-slate-50/70">
              {["Course", "Category / Date", "Price", "Students", "Actions"].map((h) => (
                <Th key={h} className="py-3 px-5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {courses.map((course, i) => (
              <Tr
                key={course._id}
                className="border-b border-slate-100  hover:bg-orange-50/30 transition-colors duration-150 group"
              >
                {/* ── Course ── */}
                <Td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="w-20 h-[52px] rounded-lg object-cover border border-slate-200 group-hover:border-orange-300 transition-colors duration-200"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-slate-800 truncate max-w-[220px] group-hover:text-[#F9872C] transition-colors duration-200">
                          {course.courseName}
                        </h3>
                        <StatusBadge status={course.status} />
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-[260px]">
                        {course.courseDescription}
                      </p>
                    </div>
                  </div>
                </Td>

                {/* ── Category / Date ── */}
                <Td className="py-4 px-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <FaTag className="text-blue-400 text-[10px] shrink-0" />
                      <span className="font-medium">{course.category?.name || "Uncategorized"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <FaCalendarAlt className="text-slate-300 text-[10px] shrink-0" />
                      <span>{formatDate(course.createdAt)}</span>
                    </div>
                  </div>
                </Td>

                {/* ── Price ── */}
                <Td className="py-4 px-5">
                  <span className={`text-sm font-bold ${course.price ? "text-slate-800" : "text-emerald-600"}`}>
                    {formatPrice(course.price)}
                  </span>
                </Td>

                {/* ── Students ── */}
                <Td className="py-4 px-5">
                  <div className="flex items-center gap-1.5">
                    <FaUsers className="text-slate-300 text-xs shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">
                      {course.studentsEnrolled?.length || 0}
                    </span>
                  </div>
                </Td>

                {/* ── Actions ── */}
                <Td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <ActionBtn
                      onClick={() => window.open(`/courses/${course._id}`, "_blank")}
                      title="View"
                      color="bg-slate-100 hover:bg-blue-500 hover:text-white cursor-pointer text-slate-500"
                    >
                      <FaEye className="text-xs" />
                    </ActionBtn>

                    <ActionBtn
                      onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                      disabled={loading}
                      title="Edit"
                      color="bg-orange-50 hover:bg-[#F9872C] cursor-pointer hover:text-white text-orange-500 border border-orange-200 hover:border-[#F9872C]"
                    >
                      <FaRegEdit className="text-xs" />
                    </ActionBtn>

                    <ActionBtn
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this course?",
                          text2: "All sections, lectures, and student progress will be permanently removed.",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: !loading ? () => handleDeleteCourse(course._id) : null,
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      disabled={loading}
                      title="Delete"
                      color="bg-red-50 hover:bg-red-500 hover:text-white text-red-400 border border-red-100 hover:border-red-500 cursor-pointer"
                    >
                      <RiDeleteBin6Line className="text-xs" />
                    </ActionBtn>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {/* ── Footer ── */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          {courses.length} course{courses.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Published
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-orange-400" /> Draft
          </span>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;