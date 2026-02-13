import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaCalendar,
  FaInstagram,
  FaTwitter,
  FaCamera,
  FaSpinner,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";
import {
  updateProfile,
  updateDisplayPicture,
} from "../../../services/operations/editProfile";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      contactNumber: "",
      dateOfBirth: "",
      about: "",
      instagram: "",
      twitter: "",
    },
  });

  const formatDateForInput = (date) => date || "";

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.additionalDetail?.gender || "",
        dateOfBirth: formatDateForInput(user.additionalDetail?.dateOfBirth),
        contactNumber: user.additionalDetail?.contactNumber || "",
        about: user.additionalDetail?.about || "",
        instagram: user.additionalDetail?.instagram || "",
        twitter: user.additionalDetail?.twitter || "",
      });
    }
  }, [user, reset]);

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const submitProfileForm = async (data) => {
    setIsSubmitting(true);

    try {
      // Step 1: Upload new profile picture if exists
      if (imageFile) {
        const formData = new FormData();
        formData.append("displayPicture", imageFile);
        await dispatch(updateDisplayPicture(token, formData));
      }

      // Step 2: Update profile information
      await dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("Error updating profile:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in-up  pr-20 bg-orange-50 ">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-vd-secondary mb-2">
          Edit Profile
        </h1>
      </div>

      {/* Profile Photo */}
      <div className="flex items-center gap-6 mb-1 bg-white rounded-xl shadow-sm border border-gray-200 p-8 ">
        <div
          onClick={handleProfileImageClick}
          className="relative w-28 h-28 rounded-full bg-gray-100 border border-dashed border-gray-300 cursor-pointer overflow-hidden"
        >
          <img
            src={previewSource || user?.image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
            <FaCamera className="text-orange-50 text-xl" />
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-800">Profile photo</p>
          <p className="text-sm text-gray-500">Upload a new profile photo</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit(submitProfileForm)}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8"
      >
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              {...register("firstName", { required: true })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              {...register("lastName", { required: true })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Gender & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Contact number
            </label>
            <input
              type="tel"
              {...register("contactNumber")}
              placeholder="Enter contact number"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date of birth
          </label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            {...register("dateOfBirth")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            This won’t be shown publicly.
          </p>
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            rows={4}
            {...register("about")}
            placeholder="Tell us about yourself"
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none"
          />
        </div>

        {/* Social Links */}
        <div className="border-t border-vd-primary pt-6">
          <h3 className="text-xl font-bold text-vd-secondary mb-4">
            Social Links
          </h3>

          <div className="space-y-4">
            <input
              {...register("instagram")}
              placeholder="Instagram username or URL"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />

            <input
              {...register("twitter")}
              placeholder="X / Twitter username or URL"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
