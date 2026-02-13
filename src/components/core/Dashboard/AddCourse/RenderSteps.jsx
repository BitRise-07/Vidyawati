import React from "react";
import { useSelector } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="animate-fade-in-up">
      {/* Progress Steps */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 -z-10"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#F9872C] to-orange-500 transform -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        <div className="flex justify-between">
          {steps.map((item) => (
            <div key={item.id} className="relative flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-all duration-300 ${
                  step >= item.id
                    ? "bg-gradient-to-r from-[#F9872C] to-orange-500 border-white shadow-lg"
                    : "bg-white border-gray-200"
                }`}
              >
                {step > item.id ? (
                  <FaCircleCheck className="text-white text-lg" />
                ) : (
                  <span className={`${step >= item.id ? "text-white" : "text-gray-400"}`}>
                    {item.id}
                  </span>
                )}
              </div>
              <span className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                step >= item.id ? "text-vd-secondary font-semibold" : "text-gray-500"
              }`}>
                {item.title}
              </span>
              {step === item.id && (
                <div className="absolute -bottom-2 w-2 h-2 bg-gradient-to-r from-[#F9872C] to-orange-500 rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {/* {step === 3 && <PublishCourse />} */}
      </div>
    </div>
  );
};

export default RenderSteps;