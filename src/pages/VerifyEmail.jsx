import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { resendOtp, signup } from "../services/operations/authAPI";
import { FiMail, FiCheck, FiArrowLeft, FiRefreshCw, FiSend } from "react-icons/fi";
import { BiLoaderCircle } from "react-icons/bi";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpError, setOtpError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitButtonRef = useRef(null);
  const prevOtpLength = useRef(0);

  // Redirect if signup data missing
  useEffect(() => {
    if (!signupData) navigate("/signup");
  }, [signupData, navigate]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Submit OTP (NO premature verification)
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setErrorMessage("Please enter a 6-digit OTP");
      setOtpError(true);
      return;
    }

    setErrorMessage("");
    setOtpError(false);

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signup(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate,
        setIsVerified,
        setOtpError,
        setErrorMessage
      )
    );
  };

  // OTP typing + auto-submit (safe)
  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    setErrorMessage("");
    setOtpError(false);

    if (
      newOtp.length === 6 &&
      prevOtpLength.current === 5 &&
      !loading &&
      !isVerified
    ) {
      setIsAutoSubmitting(true);

      setTimeout(() => {
        if (submitButtonRef.current) {
          submitButtonRef.current.click();
        }
        setIsAutoSubmitting(false);
      }, 300);
    }

    prevOtpLength.current = newOtp.length;
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (countdown > 0) return;

    setIsResending(true);
    dispatch(resendOtp(signupData.email));
    setOtp("");
    setCountdown(30);
    setErrorMessage("");
    setOtpError(false);

    setTimeout(() => setIsResending(false), 1000);
  };

  // Enter key submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && otp.length === 6 && !isVerified) {
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen bg-orange-50  flex items-center justify-center px-4 py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-[#F9872C] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-[#7C41C0] opacity-10 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-vd-secondary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#F9872C] to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiMail className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-vd-secondary mb-2">
            Verify Your Email
          </h1>
          <p className="text-vd-txt">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Email Display */}
        {signupData?.email && (
          <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-100 text-center">
            <p className="text-sm text-vd-secondary mb-1">Code sent to:</p>
            <p className="font-semibold text-[#F9872C] flex items-center justify-center gap-2">
              <FiMail />
              {signupData.email}
            </p>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-orange-100 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-t-[#F9872C] border-r-[#7C41C0] border-b-[#F9872C] border-l-[#7C41C0] rounded-full absolute top-0 left-0 animate-spin"></div>
              </div>
              <p className="text-vd-secondary font-medium mt-6">Verifying...</p>
            </div>
          ) : isVerified ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="text-green-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-vd-secondary mb-3">
                Email Verified!
              </h2>
              <p className="text-vd-txt mb-6">
                Your email has been successfully verified. Redirecting you to your dashboard...
              </p>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-t-[#F9872C] border-gray-300 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <span className="text-lg">⚠</span> {errorMessage}
                  </p>
                </div>
              )}

              {/* OTP Form */}
              <form onSubmit={handleOnSubmit} onKeyDown={handleKeyDown}>
                <div className="mb-8">
                  <label className="block text-vd-secondary font-medium mb-4 text-center">
                    Enter 6-digit verification code
                  </label>

                  <div className="flex justify-center mb-6">
                    <OTPInput
                      value={otp}
                      onChange={handleOtpChange}
                      numInputs={6}
                      separator={
                        <span className="mx-1 text-vd-muted">-</span>
                      }
                      renderInput={(props) => (
                        <input
                          {...props}
                          className={`!w-14 !h-14 mx-1 text-center text-3xl font-bold rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            otpError
                              ? "border-red-500 bg-red-50 focus:ring-red-200"
                              : "border-gray-300 bg-gray-50 focus:border-[#F9872C] focus:ring-orange-100"
                          }`}
                          style={{
                            fontWeight: 'bold',
                            color: '#192F59'
                          }}
                        />
                      )}
                      containerStyle="flex justify-center"
                    />
                  </div>

                  {/* Auto-submit Indicator */}
                  {isAutoSubmitting && (
                    <div className="flex justify-center mb-4">
                      <div className="flex items-center gap-2 text-[#F9872C] text-sm">
                        <BiLoaderCircle className="animate-spin" />
                        Auto-verifying...
                      </div>
                    </div>
                  )}

                 

                  
                </div>

                {/* Submit Button */}
                <button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={otp.length !== 6 || loading}
                  className="w-full bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <BiLoaderCircle className="animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Email
                      <span className="text-xl">→</span>
                    </>
                  )}
                </button>
              </form>

              {/* Resend OTP */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-vd-txt mb-3">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResendOtp}
                  disabled={countdown > 0 || isResending}
                  className="inline-flex items-center gap-2 text-[#F9872C] hover:text-orange-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 group cursor-pointer"
                >
                  {isResending ? (
                    <>
                      <BiLoaderCircle className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiRefreshCw className={`${countdown > 0 ? 'animate-spin-slow' : ''}`} />
                      {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                    </>
                  )}
                </button>
              </div>

              {/* Back to Login */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-vd-secondary hover:text-vd-primary transition-colors duration-300 font-medium group"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Login
                </Link>
              </div>

              
            </>
          )}
        </div>

      
        
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-medium {
          animation: pulse-medium 3s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VerifyEmail;