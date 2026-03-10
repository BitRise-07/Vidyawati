import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import CTAButton from "../HomePage/Button";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authApi";
import Tab from "../../common/Tab";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Account type
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Input handler
  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };



  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      console.log("password not matched");
      return;
    }
    console.log("Hey everyone");

    const signupData = {
      ...formData,
      accountType,
    };

    // Save data for OTP verification
    dispatch(setSignupData(signupData));

    // Send OTP
    console.log(formData.email);
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // Tab data
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="w-full">
      {/* Account Type Tabs */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={submitHandler} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-vd-secondary font-semibold text-xs">
              First Name <sup className="text-red-500">*</sup>
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={changeHandler}
              placeholder="Enter first name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-vd-secondary font-semibold text-xs">
              Last Name <sup className="text-red-500">*</sup>
            </label>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={changeHandler}
              placeholder="Enter last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-vd-secondary font-semibold text-xs">
            Email Address <sup className="text-red-500">*</sup>
          </label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            placeholder="Enter email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password */}
          <div className="space-y-2">
            <label className="text-vd-secondary font-semibold text-xs">
              Create Password <sup className="text-red-500">*</sup>
            </label>
            <div className="relative">
              <input
                required
                type={showPassword1 ? "text" : "password"}
                name="password"
                value={password}
                onChange={changeHandler}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm pr-10"
              />
              <span
                onClick={() => setShowPassword1((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword1 ? (
                  <AiOutlineEyeInvisible size={16} />
                ) : (
                  <AiOutlineEye size={16} />
                )}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-vd-secondary font-semibold text-xs">
              Confirm Password <sup className="text-red-500">*</sup>
            </label>
            <div className="relative">
              <input
                required
                type={showPassword2 ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={changeHandler}
                placeholder="Confirm password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm pr-10"
              />
              <span
                onClick={() => setShowPassword2((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword2 ? (
                  <AiOutlineEyeInvisible size={16} />
                ) : (
                  <AiOutlineEye size={16} />
                )}
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="px-6 py-3 rounded-xl font-medium shadow transition-all duration-300 transform hover:scale-105 cursor-pointer bg-[#F9872C] text-white hover:bg-vd-secondary">Create Account →</button>
      </form>
    </div>
  );
};

export default SignupForm;
