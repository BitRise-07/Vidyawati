import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck } from "react-icons/fi";
import { BiLoaderCircle } from "react-icons/bi";
import { resetPassword } from '../services/operations/authApi';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    const {loading} = useSelector((state) => state.auth);
    const location = useLocation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Check password strength and criteria
        if (name === 'password') {
            checkPasswordStrength(value);
        }
    }

    const checkPasswordStrength = (password) => {
        const criteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
        };
        
        setPasswordCriteria(criteria);
        
        // Calculate strength (0-100%)
        const strength = Object.values(criteria).filter(Boolean).length;
        setPasswordStrength(strength * 25); // 5 criteria * 25% each
    }

    const {password, confirmPassword} = formData;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token))
        setIsSubmitted(true);
    }

    const getStrengthColor = () => {
        if (passwordStrength < 40) return "#ef4444"; // red
        if (passwordStrength < 80) return "#f97316"; // orange
        return "#22c55e"; // green
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50 flex items-center justify-center px-4 py-12">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-32 h-32 bg-[#F9872C] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-[#7C41C0] opacity-10 rounded-full blur-3xl animate-pulse-medium"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-vd-secondary opacity-5 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#F9872C] to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <FiLock className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-vd-secondary mb-2">
                        Create New Password
                    </h1>
                    <p className="text-vd-txt">
                        Choose a strong and secure password for your account
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
                    ) : isSubmitted ? (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiCheck className="text-green-600 text-4xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-vd-secondary mb-3">Password Updated!</h2>
                            <p className="text-vd-txt mb-6">
                                Your password has been successfully reset. You can now login with your new password.
                            </p>
                            <Link 
                                to="/login"
                                className="block w-full bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold py-3.5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                            >
                                Go to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleOnSubmit}>
                            {/* Password Input */}
                            <div className="mb-6">
                                <label className="block text-vd-secondary font-medium mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FiLock className="text-vd-muted" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder='Enter new password'
                                        required
                                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9872C] focus:border-transparent transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-vd-muted hover:text-vd-secondary transition-colors duration-300"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm text-vd-secondary mb-1">
                                            <span>Password Strength</span>
                                            <span className="font-semibold" style={{ color: getStrengthColor() }}>
                                                {passwordStrength < 40 ? 'Weak' : passwordStrength < 80 ? 'Medium' : 'Strong'}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="h-2 rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${passwordStrength}%`,
                                                    backgroundColor: getStrengthColor()
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* Password Criteria */}
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-medium text-vd-secondary">Password must contain:</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className={`flex items-center gap-2 text-sm ${passwordCriteria.length ? 'text-green-600' : 'text-vd-muted'}`}>
                                            <div className={`w-2 h-2 rounded-full ${passwordCriteria.length ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            At least 8 characters
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm ${passwordCriteria.uppercase ? 'text-green-600' : 'text-vd-muted'}`}>
                                            <div className={`w-2 h-2 rounded-full ${passwordCriteria.uppercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            Uppercase letter
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm ${passwordCriteria.lowercase ? 'text-green-600' : 'text-vd-muted'}`}>
                                            <div className={`w-2 h-2 rounded-full ${passwordCriteria.lowercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            Lowercase letter
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm ${passwordCriteria.number ? 'text-green-600' : 'text-vd-muted'}`}>
                                            <div className={`w-2 h-2 rounded-full ${passwordCriteria.number ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            Number (0-9)
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm ${passwordCriteria.special ? 'text-green-600' : 'text-vd-muted'}`}>
                                            <div className={`w-2 h-2 rounded-full ${passwordCriteria.special ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            Special character
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="mb-8">
                                <label className="block text-vd-secondary font-medium mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FiLock className="text-vd-muted" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder='Confirm new password'
                                        required
                                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            confirmPassword && password !== confirmPassword 
                                                ? 'border-red-300 focus:ring-red-100 focus:border-red-400' 
                                                : 'border-gray-300 focus:ring-[#F9872C] focus:border-transparent'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-vd-muted hover:text-vd-secondary transition-colors duration-300"
                                    >
                                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                        <span>⚠</span> Passwords don't match
                                    </p>
                                )}
                                {confirmPassword && password === confirmPassword && password.length > 0 && (
                                    <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                                        <span>✓</span> Passwords match
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type='submit'
                                disabled={loading || (password !== confirmPassword) || password.length === 0}
                                className="w-full bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold py-3.5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <BiLoaderCircle className="animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        Reset Password
                                        <span className="text-lg">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Back to Login Link */}
                    {!isSubmitted && (
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <Link 
                                to="/login" 
                                className="flex items-center justify-center gap-2 text-vd-secondary hover:text-vd-primary transition-colors duration-300 font-medium group"
                            >
                                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                                Back to Login
                            </Link>
                        </div>
                    )}

                    {/* Security Tips */}
                    {!isSubmitted && (
                        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <h3 className="text-sm font-semibold text-vd-secondary mb-2 flex items-center gap-2">
                                <span className="text-blue-500">🔒</span> Security Tips
                            </h3>
                            <ul className="text-xs text-vd-txt space-y-1">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    Use a unique password that you don't use elsewhere
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    Consider using a password manager
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    Enable two-factor authentication for extra security
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Decorative Elements */}
                <div className="flex justify-center gap-4 mt-8">
                    <div className="w-2 h-2 bg-[#F9872C] rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-[#7C41C0] rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-[#F9872C] rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
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

export default UpdatePassword