import React from 'react';
import CTAButton from "../HomePage/Button";
import Highlightedtext from "../HomePage/Highlightedtext";
import InstructorImage from "../../../assets/images/Instructor.png";

const InstructorSection = () => {
  return (
    <div className=" mx-auto py-20">
      <div className=" rounded-3xl overflow-hidden relative">
        <div className="flex flex-col lg:flex-row items-center">
          
          <div className="flex-1 p-12 lg:p-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-vd-secondary mb-6">
                Become an <Highlightedtext>instructor</Highlightedtext>
              </h1>

              <p className="text-vd-txt text-lg lg:text-xl leading-relaxed mb-10">
                Instructors from around the world teach millions of students on StudyNotion. 
                We provide the tools and skills to teach what you love.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton 
                  variant="primary" 
                  linkTo="/signup"
                  className="px-8 py-4 text-lg font-semibold group"
                >
                  Start Teaching Today
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </CTAButton>
                
                
              </div>

              <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F9872C]">10K+</div>
                  <div className="text-sm text-vd-txt">Instructors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#7C41C0]">2M+</div>
                  <div className="text-sm text-vd-txt">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-vd-secondary">50+</div>
                  <div className="text-sm text-vd-txt">Countries</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full h-64 lg:h-96 bg-gray-200 rounded-r-3xl flex items-center justify-center">
              <img 
                src={InstructorImage} 
                alt="Instructor teaching" 
                className="w-full h-full object-cover rounded-r-3xl"
              />
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default InstructorSection