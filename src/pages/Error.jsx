import React from 'react';
import { Link } from 'react-router-dom';
import CTAButton from "../components/core/HomePage/Button";

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50 flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#F9872C] opacity-10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7C41C0] opacity-10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-vd-secondary opacity-5 rounded-full blur-3xl"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 right-20 w-12 h-12 border-4 border-[#F9872C] rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border-4 border-[#7C41C0] rounded-full opacity-20 animate-bounce-medium"></div>
        <div className="absolute top-40 right-40 w-8 h-8 bg-[#F9872C] rounded-full opacity-20 animate-ping-slow"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Animated Number */}
        <div className="relative mb-8">
          <div className="text-[200px] lg:text-[280px] font-bold text-vd-secondary opacity-10 leading-none">
            404
          </div>
          
          {/* Interactive Number Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="text-[180px] lg:text-[250px] font-bold text-gradient leading-none">
                4<span className="text-[#F9872C]">0</span>4
              </span>
              
              {/* Floating Dots */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#F9872C] rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#7C41C0] rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl lg:text-5xl font-bold text-vd-secondary mb-6">
          Oops! Page Not Found
        </h1>
        
        <p className="text-xl text-vd-txt max-w-2xl mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable. But don't worry, you can find plenty of amazing 
          courses on our homepage!
        </p>

        {/* Interactive Button */}
        <div className="mb-12">
          <Link to="/">
            <CTAButton 
              variant="primary" 
              className="px-10 py-4 text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Go Back Home
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F9872C] to-[#7C41C0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CTAButton>
          </Link>
        </div>

        

      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-medium {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-bounce-medium {
          animation: bounce-medium 2s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .text-gradient {
          background: linear-gradient(45deg, #192F59, #7C41C0, #F9872C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default Error;