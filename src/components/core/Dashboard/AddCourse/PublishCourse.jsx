import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStep, setEditCourse, resetCourseState } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import { editCourseDetails } from '../../../../services/operations/courseDetailsApi';
import { FaArrowLeft, FaArrowRight, FaGlobe, FaLock, FaCheckCircle, FaSpinner, FaEye, FaClock, FaTag, FaLayerGroup, FaRupeeSign } from "react-icons/fa";
import { toast } from "react-hot-toast";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const { course } = useSelector(state => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
    toast.success(course?.status === COURSE_STATUS.PUBLISHED 
      ? "Course published successfully!" 
      : "Course saved as draft");
  };

  const handleCoursePublish = async () => {
    const isPublic = getValues("public");

    if (
      (course.status === COURSE_STATUS.PUBLISHED && isPublic) ||
      (course.status === COURSE_STATUS.DRAFT && !isPublic)
    ) {
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const newStatus = isPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", newStatus);

    setLoading(true);
    const result = await editCourseDetails(formData);
    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = (data) => {
    handleCoursePublish();
  };

  const goBack = () => {
    dispatch(setStep(2));
    dispatch(setEditCourse(true));
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-vd-secondary mb-4">
          Publish <span className="bg-gradient-to-r from-[#F9872C] to-orange-500 bg-clip-text text-transparent">Course</span>
        </h1>
        <p className="text-lg text-vd-txt max-w-2xl">
          Review your course details and publish it to make it available for students worldwide.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-orange-50 to-white rounded-xl border border-orange-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F9872C] to-orange-500 text-white flex items-center justify-center font-bold text-sm">
          3
        </div>
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div className="h-full w-full bg-gradient-to-r from-[#F9872C] to-orange-500 rounded-full"></div>
        </div>
        <span className="text-sm font-medium text-vd-secondary">Step 3 of 3</span>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Course Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-vd-secondary to-blue-900 text-white p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaEye className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Course Summary</h2>
                  <p className="text-orange-200 text-sm">Review all course details before publishing</p>
                </div>
              </div>
            </div>

            {/* Course Details Grid */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Title */}
                <div className="col-span-2">
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-white rounded-xl border border-orange-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg flex items-center justify-center">
                        <FaTag className="text-orange-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-vd-secondary">Course Title</h3>
                    </div>
                    <p className="text-vd-secondary font-medium text-lg">{course?.courseName}</p>
                  </div>
                </div>

                {/* Category */}
                <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                      <FaLayerGroup className="text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-vd-secondary">Category</h3>
                  </div>
                  <p className="text-vd-secondary font-medium">{course?.category?.name || "Not specified"}</p>
                </div>

                {/* Price */}
                <div className="p-6 bg-gradient-to-br from-white to-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                      <FaRupeeSign className="text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-vd-secondary">Price</h3>
                  </div>
                  <p className="text-vd-secondary font-medium text-xl">
                    {course?.price ? formatPrice(course.price) : "Free"}
                  </p>
                </div>

                {/* Sections Count */}
                <div className="p-6 bg-gradient-to-br from-white to-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg flex items-center justify-center">
                      <FaClock className="text-purple-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-vd-secondary">Total Sections</h3>
                  </div>
                  <p className="text-vd-secondary font-medium text-2xl">{course?.courseContent?.length || 0}</p>
                </div>

                {/* Total Lectures */}
                <div className="p-6 bg-gradient-to-br from-white to-pink-50 rounded-xl border border-pink-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-pink-50 rounded-lg flex items-center justify-center">
                      <FaEye className="text-pink-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-vd-secondary">Total Lectures</h3>
                  </div>
                  <p className="text-vd-secondary font-medium text-2xl">
                    {course?.courseContent?.reduce((acc, section) => acc + (section.subSection?.length || 0), 0)}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <div className="p-6 bg-gradient-to-r from-yellow-50 to-white rounded-xl border border-yellow-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg flex items-center justify-center">
                        {course?.status === COURSE_STATUS.PUBLISHED ? (
                          <FaGlobe className="text-green-500" />
                        ) : (
                          <FaLock className="text-orange-500" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-vd-secondary">Current Status</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        course?.status === COURSE_STATUS.PUBLISHED
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {course?.status === COURSE_STATUS.PUBLISHED ? "Published" : "Draft"}
                      </span>
                      <span className="text-vd-muted">•</span>
                      <span className="text-sm text-vd-muted">
                        Last updated: {new Date().toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Publish Settings */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Publish Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#F9872C] to-orange-500 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Publish Settings</h3>
                <p className="text-orange-100 text-sm">Choose your course visibility</p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Public/Private Toggle */}
                  <div className="space-y-4">
                    <label className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-xl border border-orange-200 cursor-pointer group hover:border-orange-500 transition-all duration-300">
                      <input
                        id='public'
                        type="checkbox"
                        {...register("public")}
                        className="mt-1 w-5 h-5 rounded border-2 border-gray-300 checked:bg-gradient-to-r from-[#F9872C] to-orange-500 checked:border-transparent focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-vd-secondary">Make this Course Public</span>
                          {course?.status === COURSE_STATUS.PUBLISHED && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Currently Public
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-vd-muted">
                          When checked, your course will be visible to all students and searchable on the platform.
                          Uncheck to keep it as a draft.
                        </p>
                      </div>
                    </label>

                    {/* Status Preview */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        {getValues("public") ? (
                          <FaGlobe className="text-green-500 text-xl" />
                        ) : (
                          <FaLock className="text-orange-500 text-xl" />
                        )}
                        <div>
                          <p className="font-semibold text-vd-secondary">
                            {getValues("public") ? "Public Course" : "Private Draft"}
                          </p>
                          <p className="text-xs text-vd-muted mt-1">
                            {getValues("public") 
                              ? "Your course will be live immediately after publishing"
                              : "Only you can see this course. Publish later when ready"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 ${
                        loading
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#F9872C] to-orange-500 text-white hover:shadow-2xl"
                      }`}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle />
                          {getValues("public") ? "Publish Course" : "Save as Draft"}
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={goBack}
                      disabled={loading}
                      className="w-full py-4 px-6 border-2 border-vd-secondary text-vd-secondary font-bold rounded-xl hover:bg-vd-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <FaArrowLeft />
                      Back to Course Builder
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-6 border border-green-100">
              <h4 className="font-semibold text-vd-secondary mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-sm">
                  ✓
                </span>
                Before Publishing
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-vd-txt">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                  <span>Review all course content and ensure no errors</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-vd-txt">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                  <span>Check video quality and descriptions</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-vd-txt">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                  <span>Verify pricing and category information</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-vd-txt">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                  <span>Preview course as a student before publishing</span>
                </li>
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-6 border border-orange-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F9872C] to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaEye className="text-2xl text-white" />
              </div>
              <h4 className="font-semibold text-vd-secondary mb-2">Need Help?</h4>
              <p className="text-sm text-vd-txt mb-4">
                Our support team is here to assist you with any questions about publishing.
              </p>
              <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishCourse;