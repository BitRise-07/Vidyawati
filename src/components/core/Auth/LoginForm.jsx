import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"

import CTAButton from "../HomePage/Button"
import { login } from "../../../services/operations/authApi";


const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  // input handler
  function handleOnChange(event) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // submit handler (UPDATED LOGIC)
  function handleOnSubmit(event) {
    event.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="w-full">
      <form onSubmit={handleOnSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-vd-secondary font-semibold text-sm">
            Email Address <sup className="text-red-500">*</sup>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
            placeholder="Enter email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F9872C] focus:border-transparent transition-all duration-300 bg-gray-50"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-vd-secondary font-semibold text-sm">
              Password <sup className="text-red-500">*</sup>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-[#F9872C] hover:text-vd-secondary transition-colors duration-300 font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              required
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F9872C] focus:border-transparent transition-all duration-300 bg-gray-50 pr-12"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-vd-secondary cursor-pointer transition-colors duration-300"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-[#F9872C] bg-gray-100 border-gray-300 rounded focus:ring-[#F9872C] focus:ring-2"
            />
            <label htmlFor="remember" className="text-sm text-vd-txt">
              Remember me
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="px-6 py-3 rounded-xl font-medium shadow transition-all duration-300 transform hover:scale-105 cursor-pointer bg-[#F9872C] text-white hover:bg-vd-secondary">Sign In →</button>
      </form>

      {/* Social Login */}
      <div className="mt-8">
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-vd-txt text-sm">
            Or continue with
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="ml-[200px]">
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-vd-txt text-sm">Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
