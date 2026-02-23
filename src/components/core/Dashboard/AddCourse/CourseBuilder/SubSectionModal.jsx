import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross2 } from "react-icons/rx";
import { FaSpinner, FaSave, FaPlus, FaEye } from "react-icons/fa";
import Upload from '../PublishCourse/Upload';

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title || "");
      setValue("lectureDesc", modalData?.description || "");
      setValue("lectureVideo", modalData?.videoUrl || "");
    }
  }, [modalData, view, edit, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData?.title ||
      currentValues.lectureDesc !== modalData?.description ||
      currentValues.lectureVideo !== modalData?.videoUrl
    );
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData?.sectionId);
    formData.append("subSectionId", modalData?._id);

    if (currentValues.lectureTitle !== modalData?.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData?.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData?.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData);
    if (result) {
      const updatedCourseContent  = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
      toast.success("Lecture updated successfully!");
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;
    
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made");
        return;
      }
      await handleEditSubSection();
      return;
    }

    // Add new subsection
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    setLoading(true);
    const result = await createSubSection(formData);
    if (result) {
      const updatedCourseContent  = course.courseContent.map((section) => section._id === modalData ? result : section);

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
      toast.success("Lecture added successfully!");
    }
    setModalData(null);
    setLoading(false);
  };

  const getModalTitle = () => {
    if (view) return "View Lecture";
    if (edit) return "Edit Lecture";
    return "Add New Lecture";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-vd-secondary to-blue-900 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              {view ? (
                <FaEye className="text-lg text-white" />
              ) : edit ? (
                <FaSave className="text-lg text-white" />
              ) : (
                <FaPlus className="text-lg text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{getModalTitle()}</h2>
              <p className="text-sm text-white/80">
                {view ? "View lecture details" : edit ? "Update lecture information" : "Create a new lecture for your course"}
              </p>
            </div>
          </div>
          <button
            onClick={() => !loading && setModalData(null)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
          >
            <RxCross2 className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Video Upload */}
            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData?.videoUrl : null}
              editData={edit ? modalData?.videoUrl : null}
            />

            {/* Lecture Title */}
            <div>
              <label htmlFor='lectureTitle' className="block text-sm font-medium text-vd-secondary mb-2">
                Lecture Title <sup className="text-red-500">*</sup>
              </label>
              <input
                id='lectureTitle'
                placeholder="e.g., Introduction to the Topic"
                {...register("lectureTitle", { required: "Lecture title is required" })}
                disabled={view}
                className={`w-full px-4 py-3 rounded-xl border-2 text-vd-secondary placeholder:text-vd-muted focus:outline-none transition-all duration-300 ${
                  errors.lectureTitle
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : view
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : "border-orange-100 focus:border-orange-500 bg-orange-50/50 focus:bg-white"
                }`}
              />
              {errors.lectureTitle && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span> {errors.lectureTitle.message}
                </p>
              )}
            </div>

            {/* Lecture Description */}
            <div>
              <label htmlFor='lectureDesc' className="block text-sm font-medium text-vd-secondary mb-0">
                Lecture Description
              </label>
              <textarea
                id='lectureDesc'
                rows={4}
                placeholder="Provide a detailed description of what students will learn in this lecture..."
                {...register("lectureDesc", { 
                  required: view ? false : "Lecture description is required",
                  minLength: view ? 0 : {
                    value: 20,
                    message: "Description must be at least 20 characters"
                  }
                })}
                disabled={view}
                className={`w-full px-4 py-3 rounded-xl border-2 text-vd-secondary placeholder:text-vd-muted focus:outline-none resize-none transition-all duration-300 ${
                  errors.lectureDesc
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : view
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : "border-orange-100 focus:border-orange-500 bg-orange-50/50 focus:bg-white"
                }`}
              />
              {errors.lectureDesc && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span> {errors.lectureDesc.message}
                </p>
              )}
             
            </div>

            {/* Action Buttons */}
            {!view && (
              <div className="flex justify-end gap-4 pt-6 border-t border-orange-100">
                <button
                  type="button"
                  onClick={() => setModalData(null)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-3 py-2 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 ${
                    loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#F9872C] to-orange-500 text-white hover:shadow-lg"
                  }`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Processing...
                    </>
                  ) : edit ? (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Add Lecture
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubSectionModal;