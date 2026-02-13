import React from "react";
import RenderSteps from "./RenderSteps";
import { FaLightbulb, FaBook, FaVideo, FaPuzzlePiece, FaInfoCircle, FaBell } from "react-icons/fa";

export default function AddCourse() {
  const tips = [
    { icon: <FaLightbulb />, text: "Set the Course price option or make it free." },
    { icon: <FaBook />, text: "Standard size for the course thumbnail is 1024x578" },
    { icon: <FaVideo />, text: "Video section controls the course overview video" },
    { icon: <FaPuzzlePiece />, text: "Course builder is where you create & organize a course" },
    { icon: <FaBook />, text: "Add topics in the Course builder section to create lessons, quizzes and assignments" },
    { icon: <FaInfoCircle />, text: "Information from the additional data section shows up on the course single page" },
    { icon: <FaBell />, text: "Make announcements to notify all enrolled students at once" },
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h1 className="text-4xl  font-bold text-vd-secondary mb-2">
              Create <span className="bg-gradient-to-r from-[#F9872C] to-orange-500 bg-clip-text text-transparent">Course</span>
            </h1>
            <p className="text-vd-txt">Build your course step by step following our simple process</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
            <RenderSteps />
          </div>
        </div>

        {/* Tips Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg border border-orange-100 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#F9872C] to-orange-500 rounded-xl flex items-center justify-center">
                  <FaLightbulb className="text-xl text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-vd-secondary">Course Upload Tips</h2>
                  <p className="text-sm text-vd-txt">Follow these guidelines for best results</p>
                </div>
              </div>

              <ul className="space-y-4">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mt-0.5">
                      <span className="text-orange-500">{tip.icon}</span>
                    </div>
                    <span className="text-sm text-vd-txt group-hover:text-vd-secondary transition-colors duration-300">
                      {tip.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}