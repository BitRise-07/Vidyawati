import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoAddCircleSharp } from "react-icons/io5";
import { FaArrowCircleRight, FaArrowCircleLeft, FaSpinner, FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import { toast } from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsApi";
import NestedView from './NestedView';

const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, reset, formState:{errors}} = useForm();
  const [editSectionName, setEditingSectionName] = useState(null);
  const {course} = useSelector(state => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSectionSubmit = async (data) => {
    setLoading(true);
    let result;
    
    if(editSectionName){
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id
      });

      if(result){
        const updatedCourseContent  = course.courseContent.map((section) => section._id === editSectionName ? result : section);

        const updatedCourse = { ...course, courseContent: updatedCourseContent };
        dispatch(setCourse(updatedCourse));
      }
      
      toast.success("Section updated successfully!");
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      });
      toast.success("Section created successfully!");
    }

    if(result){
      dispatch(setEditCourse(result));
      dispatch(setCourse(result));
      setEditingSectionName(null);
      reset({ sectionName: "" });
    }
    
    setLoading(false);
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if(course?.courseContent?.length === 0) {
      toast.error("Please add at least one section to proceed");
      return;
    }
    if(course?.courseContent?.some(section => section.subSection?.length === 0)) {
      toast.error("Please add at least one lecture to each section to proceed");
      return;
    }

    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      setEditingSectionName(null);
      reset({ sectionName: "" });
      return;
    }
    setEditingSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const cancelEdit = () => {
    setEditingSectionName(null);
    reset({ sectionName: "" });
  };

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="border-b border-orange-100 pb-6">
        <h2 className="text-3xl font-bold text-vd-secondary">
          Course Builder
        </h2>
        <p className="text-vd-txt mt-2">
          Structure your course into meaningful sections and lectures.
        </p>
      </div>

      {/* Section Form */}
      <div className="bg-white rounded-3xl shadow-md border border-orange-100 p-8 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center shadow-sm">
            <IoAddCircleSharp className="text-3xl text-[#F9872C]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-vd-secondary">
              {editSectionName ? "Edit Section" : "Create New Section"}
            </h3>
            <p className="text-sm text-vd-txt">
              {editSectionName 
                ? "Modify the section title below" 
                : "Add a new section to organize your course"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleSectionSubmit)} className="space-y-6">
          <div>
            <label htmlFor='sectionName' className="block text-sm font-medium text-vd-secondary mb-2">
              Section Name <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-3">
              <input
                id='sectionName'
                placeholder='e.g., Introduction to React'
                {...register("sectionName", { required: true })}
                className={`flex-1 px-5 py-3 rounded-2xl border-2 text-vd-secondary 
                  placeholder:text-vd-muted focus:outline-none transition-all duration-300 ${
                  errors.sectionName 
                    ? "border-red-400 focus:border-red-500 bg-red-50" 
                    : "border-orange-200 focus:border-[#F9872C] bg-orange-50/40 focus:bg-white"
                }`}
              />

              {editSectionName && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-5 py-3 border border-gray-300 text-gray-600 font-medium rounded-2xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
            </div>

            {errors.sectionName && (
              <p className="mt-2 text-sm text-red-600">
                Section name is required.
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type='submit'
              disabled={loading}
              className={`px-3 py-3 rounded-2xl font-semibold flex items-center gap-3 hover:bg-vd-secondary transition-all duration-300 cursor-pointer ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : editSectionName
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-md"
                    : "bg-gradient-to-r from-[#F9872C] to-orange-500 text-white hover:shadow-md"
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : editSectionName ? (
                <>
                  <FaEdit />
                  Update Section
                </>
              ) : (
                <>
                  <IoAddCircleSharp />
                  Create Section
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Sections List */}
      {course?.courseContent?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-md border border-orange-100 p-8 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center shadow-sm">
              <FaEdit className="text-xl text-purple-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-vd-secondary">
                Course Sections ({course.courseContent.length})
              </h3>
              <p className="text-sm text-vd-txt">
                Manage, edit, and organize your content.
              </p>
            </div>
          </div>

          <NestedView 
            handleChangeEditSectionName={handleChangeEditSectionName}
            setEditingSectionName={setEditingSectionName}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-8 border-t border-orange-100">
        <button
          onClick={goBack}
          className="px-8 py-3 rounded-2xl border-2 border-vd-secondary text-vd-secondary font-semibold hover:bg-vd-secondary hover:text-white transition-all duration-300 flex items-center gap-3 cursor-pointer"
        >
          <FaArrowCircleLeft />
          Back
        </button>

        <button
          onClick={goToNext}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold hover:shadow-md transition-all duration-300 flex items-center gap-3 cursor-pointer"
        >
          Next
          <FaArrowCircleRight />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;