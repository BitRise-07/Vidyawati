import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsApi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import ChipInput from "./ChipInput";
import Upload from "../PublishCourse/Upload";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {COURSE_STATUS} from "../../../../../utils/constants";
import { FaSpinner, FaArrowRight, FaSave } from "react-icons/fa";


const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    
    if (editCourse && course) {
      setValue("courseTitle", course.courseName || "");
      setValue("courseShortDesc", course.courseDescription || "");
      setValue("coursePrice", course.price || "");
      setValue("courseTags", course.tag || []);
      setValue("courseBenefits", course.whatYouWillLearn || "");
      setValue("courseCategory", course.category || "");
      setValue("courseRequirements", course.instructions || []);
      setValue("courseImage", course.thumbnail || "");
    }

    getCategories();
  }, [editCourse, course]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (!course) return true;
    
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag) ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category?._id ||
      currentValues.courseImage !== course.thumbnail ||
      JSON.stringify(currentValues.courseRequirements) !== JSON.stringify(course.instructions)
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory !== course.category?._id) {
          formData.append("category", data.courseCategory);
        }
        if (JSON.stringify(currentValues.courseRequirements) !== JSON.stringify(course.instructions)) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }
        setLoading(true);
        const result = await editCourseDetails(formData);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
          toast.success("Course updated successfully!");
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // Create new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements || []));
    formData.append("tag", JSON.stringify(data.courseTags || []));
    formData.append("status", COURSE_STATUS.DRAFT);
    if (data.courseImage) {
      formData.append("thumbnail", data.courseImage);
    }

    setLoading(true);
    const result = await addCourseDetails(formData);
    if(result){
        dispatch(setStep(2));
        dispatch(setCourse(result));
        toast.success("Course created successfully!");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-vd-secondary mb-2">
          Course Title <sup className="text-red-500">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter course title"
          {...register("courseTitle", { required: "Course title is required" })}
          className={`w-full px-4 py-3 rounded-xl border-2 text-vd-secondary placeholder:text-vd-muted focus:outline-none transition-all duration-300 ${
            errors.courseTitle 
              ? "border-red-300 focus:border-red-500 bg-red-50" 
              : "border-orange-100 focus:border-orange-500 bg-orange-50/50 focus:bg-white"
          }`}
        />
        {errors.courseTitle && (
          <span className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.courseTitle.message}
          </span>
        )}
      </div>

      {/* Course Description */}
      <div>
        <label className="block text-sm font-medium text-vd-secondary mb-2">
          Course Short Description <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter course description"
          {...register("courseShortDesc", { 
            required: "Course description is required",
            minLength: {
              value: 50,
              message: "Description must be at least 50 characters"
            }
          })}
          className={`w-full min-h-[120px] px-4 py-3 rounded-xl border-2 text-vd-secondary placeholder:text-vd-muted focus:outline-none resize-none transition-all duration-300 ${
            errors.courseShortDesc 
              ? "border-red-300 focus:border-red-500 bg-red-50" 
              : "border-orange-100 focus:border-orange-500 bg-orange-50/50 focus:bg-white"
          }`}
        />
        {errors.courseShortDesc && (
          <span className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.courseShortDesc.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Price */}
        <div>
          <label className="block text-sm font-medium text-vd-secondary mb-2">
            Course Price (₹) <sup className="text-red-500">*</sup>
          </label>
          <div className="relative">
            <RiMoneyRupeeCircleLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vd-muted" />
            <input
              id="coursePrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter course price"
              {...register("coursePrice", { 
                required: "Course price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative"
                }
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-vd-secondary placeholder:text-vd-muted focus:outline-none transition-all duration-300 ${
                errors.coursePrice 
                  ? "border-red-300 focus:border-red-500 bg-red-50" 
                  : "border-orange-100 focus:border-orange-500 bg-orange-50/50 focus:bg-white"
              }`}
            />
          </div>
          {errors.coursePrice && (
            <span className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span>⚠</span> {errors.coursePrice.message}
            </span>
          )}
        </div>

        {/* Course Category */}
        <div>
          <label className="block text-sm font-medium text-vd-secondary mb-2">
            Course Category <sup className="text-red-500">*</sup>
          </label>
          <select
            id="courseCategory"
            {...register("courseCategory", { required: "Course category is required" })}
            className={`w-full px-4 py-3 rounded-xl border-2 text-vd-secondary focus:outline-none transition-all duration-300 appearance-none ${
              errors.courseCategory 
                ? "border-red-300 focus:border-red-500 bg-red-50" 
                : "border-orange-100 focus:border-orange-500 bg-orange-50/50 focus:bg-white"
            }`}
            disabled={loading}
          >
            <option value="">Select a category</option>
            {courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
          {errors.courseCategory && (
            <span className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span>⚠</span> {errors.courseCategory.message}
            </span>
          )}
        </div>
      </div>

      {/* Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Thumbnail Upload */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Course Benefits */}
      <div>
        <label className="block text-sm font-medium text-vd-secondary mb-2">
          What Will Students Learn? <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="List the key benefits and learning outcomes"
          {...register("courseBenefits", { 
            required: "Course benefits are required",
            minLength: {
              value: 30,
              message: "Please provide detailed benefits (at least 30 characters)"
            }
          })}
          className={`w-full min-h-[120px] px-4 py-3 rounded-xl border-2 text-vd-secondary placeholder:text-vd-muted focus:outline-none resize-none transition-all duration-300 ${
            errors.courseBenefits 
              ? "border-red-300 focus:border-red-500 bg-red-50" 
              : "border-orange-100 focus:border-orange-500 bg-orange-50/50 focus:bg-white"
          }`}
        />
        {errors.courseBenefits && (
          <span className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.courseBenefits.message}
          </span>
        )}
      </div>

      {/* Requirements */}
      <RequirementField
        name="courseRequirements"
        label="Requirements / Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-orange-100">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="px-6 py-3 border-2 border-vd-secondary text-vd-secondary font-semibold rounded-xl hover:bg-vd-secondary hover:text-white transition-all duration-300"
          >
            Continue Without Saving
          </button>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 px-8 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#F9872C] to-orange-500 text-white hover:shadow-xl"
          }`}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Processing...
            </>
          ) : editCourse ? (
            <>
              <FaSave />
              Save Changes
            </>
          ) : (
            <>
              Next Step
              <FaArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CourseInformationForm;