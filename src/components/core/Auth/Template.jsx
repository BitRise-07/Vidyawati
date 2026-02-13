import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from "./LoginForm";
import frameImg from "../../../assets/images/frame.png";
import Highlightedtext from "../../core/HomePage/Highlightedtext"

const Template = ({title, desc1, desc2, formType, image}) => {
  // Stats data based on form type
  const stats = {
    signup: [
      { number: "2M+", label: "Students Joined", color: "text-[#F9872C]" },
      { number: "50K+", label: "Instructors", color: "text-[#7C41C0]" }
    ],
    login: [
      { number: "95%", label: "Success Rate", color: "text-[#F9872C]" },
      { number: "24/7", label: "Support", color: "text-[#7C41C0]" }
    ]
  };

  const currentStats = stats[formType] || stats.signup;

  return (
    <div className="h-screen bg-orange-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F9872C] opacity-5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#7C41C0] opacity-5 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-vd-secondary opacity-3 rounded-full blur-3xl"></div>
      </div>

      <div className="h-full w-11/12 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-8 lg:gap-16">
          
          {/* Left Side - Form Section */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20">
              
              {/* Header Section */}
              <div className="text-center lg:text-left mb-6">
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-vd-secondary mb-3 lg:mb-4 leading-tight">
                  {title}
                </h1>
                <div className="space-y-1">
                  <p className="text-vd-txt text-base lg:text-lg leading-relaxed">{desc1}</p>
                  <p className="text-vd-txt text-base lg:text-lg font-semibold text-vd-primary">{desc2}</p>
                </div>
              </div>

              <div className="mb-4">
                {formType === "signup" ? <SignupForm /> : <LoginForm />}
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-vd-txt text-sm">
                  {formType === "signup" 
                    ? "Already have an account? " 
                    : "Don't have an account? "
                  }
                  <a 
                    href={formType === "signup" ? "/login" : "/signup"} 
                    className="text-[#F9872C] font-semibold hover:text-vd-secondary transition-all duration-300 hover:underline"
                  >
                    {formType === "signup" ? "Login" : "Sign Up"}
                  </a>
                </p>
              </div>
            </div>

           
          </div>

          <div className="flex-1 relative hidden lg:block">
            <div className="relative group">
              <div className="relative z-0">
                <img
                  src={frameImg}
                  alt="Decorative frame"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              
              {/* Main Image */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%]">
                <img
                  src={image}
                  alt={formType === "signup" ? "Students learning together" : "Student accessing online courses"}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="absolute -top-3 -left-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/20 transform group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-lg font-bold text-vd-secondary mb-1">{currentStats[0].number}</div>
                  <div className="text-xs text-vd-txt font-medium">{currentStats[0].label}</div>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/20 transform group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-lg font-bold text-vd-secondary mb-1">{currentStats[1].number}</div>
                  <div className="text-xs text-vd-txt font-medium">{currentStats[1].label}</div>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-gradient-to-r from-[#F9872C] to-[#7C41C0] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {formType === "signup" ? "🎉 Join Now" : "🚀 Welcome Back"}
              </div>
            </div>

            <div className="absolute -z-10 top-8 -right-8 w-32 h-32 bg-[#F9872C] opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-8 -left-8 w-40 h-40 bg-[#7C41C0] opacity-10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.05); }
        }
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.1); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-medium {
          animation: pulse-medium 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Template;