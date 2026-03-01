import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStep, setEditCourse, resetCourseState } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import { editCourseDetails } from '../../../../services/operations/courseDetailsApi';
import {
  FaArrowLeft, FaGlobe, FaLock, FaCheckCircle,
  FaSpinner, FaTag, FaLayerGroup, FaRupeeSign, FaListUl, FaPlay
} from "react-icons/fa";
import { toast } from "react-hot-toast";

/* ── tiny stat card ── */
const StatTile = ({ icon, label, value, accent }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${accent}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{value}</p>
    </div>
  </div>
);

const PublishCourse = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { course } = useSelector(state => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isPublic = watch("public");

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
    toast.success(
      course?.status === COURSE_STATUS.PUBLISHED
        ? "Course published successfully!"
        : "Course saved as draft"
    );
  };

  const handleCoursePublish = async () => {
    const currentlyPublic = watch("public");
    if (
      (course.status === COURSE_STATUS.PUBLISHED && currentlyPublic) ||
      (course.status === COURSE_STATUS.DRAFT && !currentlyPublic)
    ) {
      goToCourses();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append("status", currentlyPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT);
    setLoading(true);
    const result = await editCourseDetails(formData);
    if (result) goToCourses();
    setLoading(false);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price || 0);

  const totalLectures = course?.courseContent?.reduce(
    (acc, s) => acc + (s.subSection?.length || 0), 0
  ) ?? 0;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">

     

     

      {/* ── Two-column layout ── */}
      <div className="grid lg:grid-cols-5 gap-7">

        {/* Left — course summary */}
        <div className="lg:col-span-3 space-y-5">

          {/* Hero banner for the course */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            {/* Dark header */}
            <div className="bg-gradient-to-r from-[#0f1b3d] to-blue-900 px-6 py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <FaPlay className="text-orange-400 text-sm ml-0.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider mb-0.5">Course Title</p>
                <h2 className="text-base font-bold text-white leading-snug truncate">
                  {course?.courseName || '—'}
                </h2>
              </div>
              <div className={`ml-auto shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold ${
                course?.status === COURSE_STATUS.PUBLISHED
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
              }`}>
                {course?.status === COURSE_STATUS.PUBLISHED ? 'Published' : 'Draft'}
              </div>
            </div>

            {/* Stat grid */}
            <div className="p-5 bg-white grid grid-cols-2 gap-3">
              <StatTile
                icon={<FaLayerGroup className="text-blue-500 text-sm" />}
                label="Category"
                value={course?.category?.name || 'Not set'}
                accent="bg-blue-50"
              />
              <StatTile
                icon={<FaRupeeSign className="text-emerald-500 text-sm" />}
                label="Price"
                value={course?.price ? formatPrice(course.price) : 'Free'}
                accent="bg-emerald-50"
              />
              <StatTile
                icon={<FaListUl className="text-purple-500 text-sm" />}
                label="Sections"
                value={`${course?.courseContent?.length || 0} sections`}
                accent="bg-purple-50"
              />
              <StatTile
                icon={<FaTag className="text-orange-500 text-sm" />}
                label="Lectures"
                value={`${totalLectures} lectures`}
                accent="bg-orange-50"
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Pre-publish checklist</p>
            <ul className="space-y-2.5">
              {[
                'All sections have at least one lecture',
                'Course thumbnail and description are set',
                'Pricing and category are confirmed',
                'Preview as a student before going live',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <FaCheckCircle className="text-emerald-400 mt-0.5 shrink-0 text-[13px]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — publish panel */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

            {/* Panel header */}
            <div className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Visibility Settings</h3>
              <p className="text-xs text-slate-400 mt-0.5">Control who can see your course</p>
            </div>

            <form onSubmit={handleSubmit(handleCoursePublish)} className="p-6 space-y-5">

              {/* Toggle option */}
              <label className="flex items-start gap-3.5 cursor-pointer group">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    id="public"
                    type="checkbox"
                    {...register("public")}
                    className="peer sr-only"
                  />
                  {/* custom toggle */}
                  <div className="w-10 h-6 rounded-full bg-slate-200 peer-checked:bg-[#F9872C] transition-colors duration-200" />
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Make course public</p>
                 
                </div>
              </label>

              

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* CTA buttons */}
              <div className="space-y-2.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#F9872C] to-orange-400 hover:shadow-lg hover:shadow-orange-100 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {loading ? (
                    <><FaSpinner className="animate-spin" /> Processing…</>
                  ) : (
                    <><FaCheckCircle /> {isPublic ? 'Publish Course' : 'Save as Draft'}</>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { dispatch(setStep(2)); dispatch(setEditCourse(true)); }}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-800 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <FaArrowLeft className="text-xs" /> Back to Builder
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PublishCourse;