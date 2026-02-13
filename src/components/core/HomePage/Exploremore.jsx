import React, { useState } from 'react';
import { HomePageExplore } from "../../../data/homepage-explore"
import Highlightedtext from './Highlightedtext';
import CTAButton from './Button';

const tabsName = [
    "Free", "New to coding", "Most popular", "Skill paths", "Career paths"
];

const Exploremore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-vd-secondary py-20">
            <div className="w-11/12 mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Unlock the{" "}
                        <Highlightedtext>Power of Code</Highlightedtext>
                    </h2>
                    <p className="text-lg text-gray-300 font-medium max-w-2xl mx-auto">
                        Learn to Build Anything You Can Imagine
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {tabsName.map((element, index) => (
                        <button
                            key={index}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                                currentTab === element 
                                    ? "bg-[#F9872C] text-white shadow-lg shadow-orange-500/25" 
                                    : "bg-white/10 text-gray-300 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:text-white"
                            }`}
                            onClick={() => setMyCards(element)}
                        >
                            {element}
                        </button>
                    ))}
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                                currentCard === course.heading
                                    ? "border-[#F9872C] shadow-lg shadow-orange-500/25 bg-white/20"
                                    : "border-white/20 hover:border-white/40 hover:shadow-xl"
                            }`}
                            onClick={() => setCurrentCard(course.heading)}
                        >
                            {/* Course Icon */}
                            <div className="w-12 h-12 bg-gradient-to-r from-[#F9872C] to-orange-400 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-white text-lg">{course.icon || "💻"}</span>
                            </div>

                            {/* Course Title */}
                            <h3 className="text-xl font-bold text-white mb-3">
                                {course.heading}
                            </h3>

                            {/* Course Description */}
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                {course.description}
                            </p>

                            {/* Course Level & Duration */}
                            <div className="flex justify-between items-center text-xs text-gray-400">
                                <span className="bg-white/20 px-3 py-1 rounded-full">
                                    {course.level || "Beginner"}
                                </span>
                                <span>{course.duration || "Self-paced"}</span>
                            </div>

                            {/* Progress Bar (if applicable) */}
                            {course.progress && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                                        <span>Progress</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div 
                                            className="bg-[#F9872C] h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#F9872C]/10 to-[#7C41C0]/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                    ))}
                </div>

                {/* View All Courses Button */}
                <div className="text-center">
                    <CTAButton 
                        variant="primary" 
                        linkTo="/courses"
                        className="px-8 py-4 text-lg group"
                    >
                        View All Courses
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </CTAButton>
                </div>

                {/* Stats Section */}
                <div className="flex justify-center gap-12 mt-16 pt-12 border-t border-white/20">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#F9872C] mb-2">500+</div>
                        <div className="text-gray-300 text-sm uppercase tracking-wider">Courses</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#7C41C0] mb-2">50K+</div>
                        <div className="text-gray-300 text-sm uppercase tracking-wider">Students</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">98%</div>
                        <div className="text-gray-300 text-sm uppercase tracking-wider">Success Rate</div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#F9872C] opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#7C41C0] opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}

export default Exploremore;