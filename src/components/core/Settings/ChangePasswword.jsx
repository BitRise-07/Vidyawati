import React, { useState } from "react";
import { changePassword } from "../../../services/operations/authApi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [show, setShow] = useState({
    password: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { password, newPassword, confirmNewPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    if (
      (name === "newPassword" || name === "confirmNewPassword") &&
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      setErrors((p) => ({
        ...p,
        confirmNewPassword: "Passwords do not match",
      }));
    } else {
      setErrors((p) => ({ ...p, confirmNewPassword: null }));
    }
  };

  const validate = () => {
    const e = {};
    if (!password) e.password = "Current password is required";
    if (!newPassword) e.newPassword = "New password is required";
    else if (newPassword.length < 8)
      e.newPassword = "Minimum 8 characters required";
    if (!confirmNewPassword)
      e.confirmNewPassword = "Please confirm new password";
    else if (newPassword !== confirmNewPassword)
      e.confirmNewPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await dispatch(
      changePassword(token, password, newPassword, confirmNewPassword, navigate)
    );
    setIsSubmitting(false);
  };

  return (
    <div className="w-11/12 pr-10 mx-auto animate-fade-in-up">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-vd-secondary mb-2">
          Change Password
        </h1>
       
      </div>

      {/* Page Section */}
      <div className="bg-white rounded-2xl border border-orange-100 shadow-[0_18px_40px_rgba(25,47,89,0.1)] p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Current Password */}
          <div>
            <label className="block font-semibold text-vd-secondary mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={show.password ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter current password"
                className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none pr-14
                  ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-orange-100 bg-orange-50/40 focus:border-orange-500 focus:bg-white"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShow((p) => ({ ...p, password: !p.password }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.password ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block font-semibold text-vd-secondary mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={show.newPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                placeholder="Create a new password"
                className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none pr-14
                  ${
                    errors.newPassword
                      ? "border-red-300 bg-red-50"
                      : "border-orange-100 bg-orange-50/40 focus:border-orange-500 focus:bg-white"
                  }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShow((p) => ({ ...p, newPassword: !p.newPassword }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.newPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-semibold text-vd-secondary mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={show.confirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none pr-14
                  ${
                    errors.confirmNewPassword
                      ? "border-red-300 bg-red-50"
                      : "border-orange-100 bg-orange-50/40 focus:border-orange-500 focus:bg-white"
                  }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShow((p) => ({
                    ...p,
                    confirmNewPassword: !p.confirmNewPassword,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.confirmNewPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </button>
            </div>

            {errors.confirmNewPassword && (
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmNewPassword}
              </p>
            )}

            {newPassword &&
              confirmNewPassword &&
              !errors.confirmNewPassword && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                  <FaCheckCircle /> Passwords match
                </p>
              )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all ${
              isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-[#F9872C] to-orange-500 text-white hover:shadow-xl hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
