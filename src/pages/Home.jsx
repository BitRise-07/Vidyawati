import React from "react";
import CTAButton from "../components/core/HomePage/Button";
import Highlightedtext from "../components/core/HomePage/Highlightedtext";
import { statsData, categoriesData } from "../data/homeData";
import BgAnimation from "../components/core/HomePage/BgAnimation";
import CategoryCard from "../components/core/HomePage/CategoryCard";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLangSection from "../components/core/HomePage/LearningLangSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Exploremore from "../components/core/HomePage/Exploremore";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import StudentWithLaptop from "..//assets/images/heroimg.jpg";
import StudentWithPhone from "..//assets/images/heroimg2.png";


const Home = () => {

  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  if (authLoading || profileLoading) {
    return <Spinner />;
  }
  // Statistics data
  const stats = statsData;

  // Technical course categories
  const categories = categoriesData;
  const handleCategoryClick = (categoryName) => {
    console.log(`Category clicked: ${categoryName}`);
    // You can add navigation or state management here
  };

  return (
    <div className="min-h-screen w-full animate-fade-in-up   overflow-x-hidden bg-orange-50">
      {/* Hero Section */}
      <div className="bg-orange-50  min-h-screen overflow-hidden">
        <div className=" w-11/12 mx-auto relative min-h-screen flex items-center font-[Inter] py-12">
          <BgAnimation />

          <div className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Left Content with animations */}
            <div className="animate-fade-in-up">
              <h1 className="md:text-5xl font-extrabold leading-snug text-vd-secondary text-7xl">
                Unlock{" "}
                <span>
                  <Highlightedtext>your potential</Highlightedtext>
                </span>{" "}
                <br />
                with expert-led online <br />
                courses & skills training
              </h1>

              <p className="text-vd-txt mt-4 max-w-lg animate-fade-in-up delay-100">
                Vidyawati is a trusted learning platform that connects students
                and educators. It offers a wide range of online courses.
              </p>

              {/* Animated Students info */}
              <div className="flex items-center gap-3 mt-6 animate-fade-in-up delay-200">
                <div className="flex -space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="student"
                    className="w-8 h-8 rounded-full border-2 border-white transition-transform duration-300 hover:scale-110 hover:z-10"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="student"
                    className="w-8 h-8 rounded-full border-2 border-white transition-transform duration-300 hover:scale-110 hover:z-10 delay-75"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/3.jpg"
                    alt="student"
                    className="w-8 h-8 rounded-full border-2 border-white transition-transform duration-300 hover:scale-110 hover:z-10 delay-150"
                  />
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-vd-secondary text-white text-xs font-bold transition-all duration-300 hover:scale-110 hover:bg-[#F9872C]">
                    12+
                  </div>
                </div>
                <p className="text-[#192F59] font-semibold text-sm">
                  Enrolled{" "}
                  <span className="font-normal text-vd-muted">Student</span>
                </p>
              </div>

              {/* Animated CTA Button */}
              <div className="mt-6 animate-fade-in-up delay-200 inline-block group">
                <CTAButton active={true} linkTo={"/signup"}>
                  Get Started
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </CTAButton>
              </div>

              {/* Stats Section */}
              <div className="flex gap-8 mt-8 animate-fade-in-up delay-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-vd-secondary">
                    500+
                  </div>
                  <div className="text-sm text-vd-muted">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-vd-primary">50+</div>
                  <div className="text-sm text-vd-muted">Instructors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#7C41C0]">98%</div>
                  <div className="text-sm text-vd-muted">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Side Images with enhanced animations */}
            <div className="relative mt-12 lg:mt-0">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main image with cutout */}
                <div className="relative w-95 h-130 mx-auto bg-gray-300 rounded-[3rem] overflow-hidden rotate-[-5deg] transform animate-float-medium shadow-2xl hover:rotate-0 transition-transform duration-500 group">
                  <img
                    src={StudentWithLaptop}
                    alt="student with laptop"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-white opacity-20 transform -rotate-12 rounded-[2rem] group-hover:opacity-0 transition-opacity duration-300"></div>

                  {/* Floating elements on image */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg animate-bounce-slow">
                    <div className="text-xs font-bold text-vd-secondary">
                      New Course!
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-[#F9872C] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-ping-slow">
                    <span className="text-sm font-bold">🎯</span>
                  </div>
                </div>

                {/* Second image */}
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-70 h-90 rounded-2xl overflow-hidden shadow-2xl rotate-[5deg] z-10 animate-float-slow hover:rotate-0 transition-transform duration-500 group">
                  <img
                    src={StudentWithPhone}
                    alt="student on phone"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Achievement badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#F9872C] to-[#7C41C0] text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    ⭐ 4.9 Rating
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-4 shadow-2xl animate-bounce-medium hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        Success Stories
                      </div>
                      <div className="text-xs text-gray-500">
                        Join 10k+ students
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <section className="py-20 w-11/12 mx-auto bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-100 rounded-full opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 rounded-full opacity-50 animate-pulse-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-vd-secondary mb-4">
              Our <span className="text-vd-primary">Impact</span> in Numbers
            </h2>
            <p className="text-vd-txt text-lg max-w-2xl mx-auto">
              Join millions of learners who have transformed their careers with
              our platform
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-vd-primary to-vd-secondary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-vd-txt font-medium text-sm md:text-base">
                  {stat.label}
                </div>
                {/* Animated progress bar for career change */}
                {stat.label === "Career Changed" && (
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "0%" }}
                      onMouseEnter={(e) => (e.target.style.width = "73%")}
                      onMouseLeave={(e) => (e.target.style.width = "0%")}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-20  w-11/12 mx-auto relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-vd-secondary mb-4">
              Explore <Highlightedtext>Top Categories</Highlightedtext>
            </h2>
            <p className="text-vd-txt text-lg max-w-2xl mx-auto">
              Discover our wide range of technical courses designed for modern
              careers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                category={category}
                index={index}
                onClick={() => handleCategoryClick(category.name)}
              />
            ))}
          </div>

          {/* View All Categories Button */}
          <div className="text-center mt-12 animate-fade-in-up">
            <CTAButton
              variant="secondary"
              linkTo="/categories"
              className="px-8 py-3"
            >
              View All Categories
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20  bg-gradient-to-r from-vd-primary to-vd-secondary relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full animate-pulse-medium"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Join millions of learners worldwide and unlock your potential with
            our expert-led courses
          </p>
          <div className="animate-fade-in-up delay-200">
            <CTAButton
              variant="outline"
              linkTo={"/signup"}
              className="px-8 py-4 text-lg font-semibold"
            >
              Start Learning Today
            </CTAButton>
          </div>
        </div>
      </section>
      <CodeBlock
        position={"lg:flex-row"}
        heading={
          <div className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Unlock your <br />
            <Highlightedtext>coding potential</Highlightedtext> <br />
            with our online courses.
          </div>
        }
        subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        ctabtn1={{
          text: "Try it Yourself",
          variant: "primary",
          linkTo: "/signup",
          className: "px-8 py-4 text-lg",
        }}
        ctabtn2={{
          text: "Learn More",
          variant: "outline",
          linkTo: "/courses",
          className:
            "px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-gray-900",
        }}
        codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Learn to Code</title>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>\n<body>\n  <h1>Start Your Coding Journey</h1>\n  <p>Transform your career with our expert-led courses.</p>\n</body>\n</html>`}
        backgroundGradient="bg-gradient-to-br from-vd-secondary to-vd-primary"
        codeColor="text-yellow-300"
      />

      {/* Code Block Section 2 */}
      <div className="bg-gradient-to-br from-gray-900  to-vd-secondary">
        <CodeBlock
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Start coding in <br />
              <Highlightedtext>seconds</Highlightedtext>
            </div>
          }
          subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          ctabtn1={{
            text: "Continue Lesson",
            variant: "primary",
            linkTo: "/lesson",
            className: "px-8 py-4 text-lg",
          }}
          ctabtn2={{
            text: "Learn More",
            variant: "outline",
            linkTo: "/about",
            className:
              "px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-gray-900",
          }}
          codeblock={`// Welcome to JavaScript\nfunction welcomeStudent(name) {\n  console.log("Hello, " + name + "!");\n  return "Ready to learn coding?";\n}\n\n// Call the function\nconst message = welcomeStudent("Developer");\nconsole.log(message);\n\n// Output:\n// Hello, Developer!\n// Ready to learn coding?`}
          codeColor="text-green-400"
        />

        {/*Explore more section */}
        <div className="flex text-white flex-col items-center justify-between gap-5  mx-auto">
          <Exploremore />
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-purple-50">
        
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col justify-evenly items-center gap-7">
          <TimelineSection />
          <LearningLangSection />
        </div>
      </div>

      {/* Instructor section */}
      <div className="bg-gradient-to-br from-orange-50 to-purple-50">
        <div className=" mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter text-white ">
          <InstructorSection />
        </div>
        <h2 className="text-center text-4xl font-semibold mt-10 text-vd-secondary">
          Reviews from other learners
        </h2>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
