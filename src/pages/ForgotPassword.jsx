import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CTAButton from "../components/core/HomePage/Button";
import Highlightedtext from "../components/core/HomePage/Highlightedtext";
import { FiMail, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { BiLoaderCircle } from "react-icons/bi";
import { getPasswordResetToken } from '../services/operations/authApi';
import Spinner from '../components/common/Spinner';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const {loading} = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(getPasswordResetToken(email, setEmailSent));
        setIsSubmitting(false);
    };
    const handleResend = () => {
        if (!emailSent) return;
        handleResendEmail();
    }
    const handleResendEmail = () => {
        setIsSubmitting(true);
        dispatch(getPasswordResetToken(email, setEmailSent));
        setIsSubmitting(false);
    }
    const { loading: authLoading } = useSelector((state) => state.auth);
      const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
      );
    
      if (authLoading || profileLoading) {
        return (
          <Spinner />
        );
      }


  return (
    <div className="min-h-screen bg-orange-50  flex items-center justify-center px-4 py-12">
       

        <div className="w-full max-w-md relative z-10">
            {/* Logo/Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[#F9872C] to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FiMail className="text-white text-2xl" />
                </div>
                <h1 className="text-3xl font-bold text-vd-secondary mb-2">
                    {!emailSent ? "Reset Your Password" : "Check Your Email"}
                </h1>
                <p className="text-vd-txt">
                    {!emailSent ? "Secure your Vidyawati account" : "Reset link sent successfully"}
                </p>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-orange-100 rounded-full"></div>
                            <div className="w-20 h-20 border-4 border-t-[#F9872C] border-r-[#7C41C0] border-b-[#F9872C] border-l-[#7C41C0] rounded-full absolute top-0 left-0 animate-spin"></div>
                        </div>
                        <p className="text-vd-secondary font-medium mt-6">Loading...</p>
                    </div>
                ) : (
                    <div>
                        {/* Description */}
                        <p className="text-vd-txt text-center mb-8">
                            {!emailSent 
                                ? "Enter your email address to receive a password reset link."
                                : `An email has been sent to ${email} with instructions to reset your password.`
                            }
                        </p>

                        {/* Success Icon */}
                        {emailSent && (
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                    <FiCheckCircle className="text-green-600 text-4xl" />
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            {!emailSent && (
                                <div className="mb-6">
                                    <label className="block text-vd-secondary font-medium mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                            <FiMail className="text-vd-muted" />
                                        </div>
                                        <input 
                                            type="email" 
                                            name='email'
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            placeholder='Enter your email address'
                                            required 
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9872C] focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                    <p className="text-sm text-vd-muted mt-2">
                                        We'll send a secure password reset link to your email
                                    </p>
                                </div>
                            )}

                            {/* Submit/Resend Button */}
                            <button
                                type={!emailSent ? "submit" : "button"}
                                onClick={handleResend}

                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold py-3.5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <BiLoaderCircle className="animate-spin" />
                                        {!emailSent ? "Sending..." : "Resending..."}
                                    </>
                                ) : (
                                    <>
                                        {!emailSent ? "Reset Password" : "Resend Email"}
                                        <span className="text-lg">→</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Back to Login Link */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <Link 
                                to="/login" 
                                className="flex items-center justify-center gap-2 text-vd-secondary hover:text-vd-primary transition-colors duration-300 font-medium group cursor-pointer"
                            >
                                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300 " />
                                Back to Login
                            </Link>
                        </div>

                        {/* Additional Help */}
                        <div className="mt-6 bg-orange-50 rounded-xl p-4 border border-orange-100">
                            <h3 className="text-sm font-semibold text-vd-secondary mb-2">💡 Need help?</h3>
                            <p className="text-xs text-vd-txt">
                                If you don't see the email in your inbox, check your spam folder or 
                                <Link to="/contact" className="text-[#F9872C] font-medium ml-1 hover:underline">
                                    contact support
                                </Link>
                            </p>
                        </div>
                    </div>
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
            
            .animate-pulse-slow {
                animation: pulse-slow 4s ease-in-out infinite;
            }
            .animate-pulse-medium {
                animation: pulse-medium 3s ease-in-out infinite;
            }
        `}</style>
    </div>
  )
}

export default ForgotPassword