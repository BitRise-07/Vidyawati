import React, { useState, useEffect } from "react";
import {
  FaGraduationCap,
  FaUsers,
  FaBook,
  FaAward,
  FaCheckCircle,
  FaChalkboardTeacher,
  FaGlobeAmericas,
  FaHandsHelping,
  FaRocket,
  FaLightbulb,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CTAButton from "../components/core/HomePage/Button";
import Highlightedtext from "../components/core/HomePage/Highlightedtext";
import Footer from "../components/common/Footer";
import Button from "../components/core/HomePage/Button";

const AboutPage = () => {
  const navigate = useNavigate();
  const [activeValue, setActiveValue] = useState(0);
  const [counterValues, setCounterValues] = useState({
    students: 0,
    instructors: 0,
    courses: 0,
    countries: 0,
  });

  const targetStats = {
    students: 50000,
    instructors: 500,
    courses: 100,
    countries: 25,
  };

  useEffect(() => {
    const counters = setInterval(() => {
      setCounterValues((prev) => ({
        students: Math.min(prev.students + 100, targetStats.students),
        instructors: Math.min(prev.instructors + 5, targetStats.instructors),
        courses: Math.min(prev.courses + 2, targetStats.courses),
        countries: Math.min(prev.countries + 1, targetStats.countries),
      }));
    }, 20);

    return () => clearInterval(counters);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "20+ years in education technology",
      specialty: "EdTech Innovation",
      color: "from-orange-400 to-orange-500",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Curriculum",
      bio: "Curriculum design specialist",
      specialty: "Learning Design",
      color: "from-vd-secondary to-blue-700",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Learning Director",
      bio: "Student success advocate",
      specialty: "Student Experience",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      name: "David Park",
      role: "Tech Director",
      bio: "EdTech innovation expert",
      specialty: "Platform Architecture",
      color: "from-green-500 to-green-600",
    },
  ];

  const stats = [
    {
      number: `${counterValues.students}+`,
      label: "Active Students",
      icon: <FaUsers className="text-3xl" />,
      color: "text-orange-500",
    },
    {
      number: `${counterValues.instructors}+`,
      label: "Expert Instructors",
      icon: <FaChalkboardTeacher className="text-3xl" />,
      color: "text-vd-secondary",
    },
    {
      number: `${counterValues.courses}+`,
      label: "Courses Available",
      icon: <FaBook className="text-3xl" />,
      color: "text-purple-600",
    },
    {
      number: `${counterValues.countries}+`,
      label: "Countries Reached",
      icon: <FaGlobeAmericas className="text-3xl" />,
      color: "text-green-500",
    },
  ];

  const values = [
    {
      title: "Student Success First",
      description:
        "We prioritize measurable learning outcomes and student achievement above all else.",
      icon: <FaHeart className="text-3xl" />,
      color: "bg-orange-100 border-orange-200",
    },
    {
      title: "Innovation in Learning",
      description:
        "Constantly evolving our methods to incorporate the latest educational research and technology.",
      icon: <FaLightbulb className="text-3xl" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Accessibility for All",
      description:
        "Breaking down barriers to education through affordable and inclusive programs.",
      icon: <FaHandsHelping className="text-3xl" />,
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Community Building",
      description:
        "Fostering supportive learning communities that extend beyond the classroom.",
      icon: <FaUsers className="text-3xl" />,
      color: "bg-green-50 border-green-200",
    },
  ];

  const milestones = [
    {
      year: "2015",
      title: "Platform Launch",
      description: "Started with 10 courses and 100 students",
    },
    {
      year: "2018",
      title: "Mobile App Launch",
      description: "Expanded learning to mobile devices",
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Reached students in 50+ countries",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Implemented AI-powered learning paths",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 animate-fade-in-up ">
      {/* Header/Hero Section */}
      <section className="relative py-20 w-11/12 mx-auto md:px-8 lg:px-16 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0">
          <div className="absolute top-24 left-12 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-15"></div>
          <div className="absolute bottom-24 right-12 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-15"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                About Us
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-vd-secondary leading-tight">
                Learn. Grow. Succeed with{" "}
                <span className="text-orange-500">Vidyawati</span>
              </h1>

              <p className="text-base md:text-lg text-vd-txt leading-relaxed">
                Vidyawati is built to make quality education accessible,
                practical, and career-focused. We connect learners with
                expert-led courses designed for real-world impact.
              </p>

              <p className="text-base md:text-lg text-vd-txt leading-relaxed">
                Whether you're starting your journey or upgrading your skills,
                our platform helps you learn efficiently and grow confidently.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="primary"
                  linkTo="/course"
                  className="px-6 py-3 text-base font-semibold"
                >
                  Explore Courses →
                </Button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-3 border border-vd-secondary text-vd-secondary font-semibold rounded-lg hover:bg-vd-secondary hover:text-white transition cursor-pointer"
                >
                  Start Free Trial
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 w-full max-w-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
                    <FaRocket />
                  </div>
                  <h3 className="text-lg font-semibold text-vd-secondary">
                    Trusted Learning Platform
                  </h3>
                </div>

                <ul className="space-y-4 text-sm text-vd-txt">
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />
                    Industry-relevant courses
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />
                    Learn at your own pace
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />
                    Lifetime access & certification
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 w-11/12 mx-auto md:px-8 lg:px-16 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-vd-secondary mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-[#F9872C] to-orange-500 bg-clip-text text-transparent">
                Impact
              </span>{" "}
              in Numbers
            </h2>
            <p className="text-lg text-vd-txt max-w-2xl mx-auto">
              Join thousands of learners who have transformed their careers with
              our platform
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`${stat.color} flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-vd-secondary to-vd-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-vd-txt font-medium">{stat.label}</div>
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 w-11/12 mx-auto md:px-8 lg:px-16 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F9872C] via-orange-400 to-[#F9872C]"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-vd-secondary mb-6">
              Our Core <span className="text-vd-primary">Values</span>
            </h2>
            <p className="text-lg text-vd-txt max-w-3xl mx-auto">
              These principles guide everything we do at Vidyawati, from course
              design to student support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl p-8 border-2 ${value.color} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className="absolute top-4 right-4 opacity-10 transform group-hover:scale-150 group-hover:opacity-20 transition-all duration-500">
                  {value.icon}
                </div>

                <div className="relative z-10">
                  <div className="text-4xl font-bold text-vd-secondary mb-4 opacity-20">
                    0{index + 1}
                  </div>
                  <div className="text-vd-primary mb-4 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-vd-secondary mb-4 group-hover:text-vd-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-vd-txt leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-vd-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 w-11/12 mx-auto md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Why Choose Us */}
            <div className="bg-white border border-orange-100 rounded-2xl p-8 shadow-sm lg:col-span-2">
              <h3 className="text-2xl font-semibold text-vd-secondary mb-3">
                Why Choose Vidyawati
              </h3>
              <div className="w-12 h-1 bg-orange-500 rounded-full mb-6"></div>

              <p className="text-base text-vd-txt leading-relaxed mb-8">
                Vidyawati delivers industry-aligned education using modern
                learning technology and expert-led instruction. Our platform is
                designed to help learners gain practical skills, improve
                outcomes, and advance their careers with confidence.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50">
                  <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium text-vd-secondary">
                    Personalized Learning Paths
                  </span>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50">
                  <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
                    <FaAward className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium text-vd-secondary">
                    Industry-Recognized Certifications
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/benefits")}
                className="text-sm font-semibold text-vd-primary hover:text-orange-600 transition inline-flex items-center"
              >
                Explore all benefits
                <span className="ml-2">→</span>
              </button>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-vd-secondary mb-6">
                  Learning Outcomes
                </h4>

                <div className="space-y-5 text-sm">
                  <div>
                    <div className="flex justify-between mb-1 text-vd-muted">
                      <span>Course Completion</span>
                      <span className="font-medium text-vd-secondary">94%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "94%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-vd-muted">
                      <span>Career Advancement</span>
                      <span className="font-medium text-vd-secondary">89%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "89%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-vd-muted">
                      <span>Learner Satisfaction</span>
                      <span className="font-medium text-vd-secondary">96%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: "96%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-vd-secondary rounded-lg flex items-center justify-center text-white">
                    <FaGraduationCap />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-vd-secondary">
                      24/7 Support
                    </p>
                    <p className="text-sm text-vd-muted">
                      Learning assistance anytime
                    </p>
                  </div>
                </div>
                <p className="text-sm text-vd-muted">
                  Get continuous access to instructors, resources, and support
                  whenever you need help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 w-11/12 mx-auto md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-vd-secondary mb-3">
              Leadership Team
            </h2>
            <p className="text-base text-vd-muted max-w-xl mx-auto">
              Experienced professionals guiding Vidyawati’s vision and growth
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-orange-100 rounded-xl p-6 hover:shadow-lg transition duration-300"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-5">
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold`}
                  >
                    {member.name.charAt(0)}
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-vd-secondary">
                    {member.name}
                  </h4>
                  <p className="text-sm text-vd-primary font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-vd-muted mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Specialty */}
                <div className="flex justify-center mt-4">
                  <span className="px-3 py-1 text-xs bg-orange-50 text-orange-600 rounded-full font-medium">
                    {member.specialty}
                  </span>
                </div>

                {/* Social */}
                <div className="flex justify-center gap-4 mt-5 pt-4 border-t border-orange-100">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    in
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                  >
                    x
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-r from-vd-primary to-vd-secondary relative overflow-hidden">
        {/* Subtle Background Accents */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-28 h-28 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-16 right-16 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <FaGraduationCap className="text-2xl text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Start Your Learning Journey Today
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Learn in-demand skills with expert-led courses designed to help you
            grow, upskill, and advance your career with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              linkTo="/course"
              className="px-6 py-3 text-base font-semibold"
            >
              Explore Courses
            </Button>

            <Button
              variant="outline"
              linkTo="/signup"
              className="px-6 py-3 text-base font-semibold"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Trust Line */}
          <p className="mt-6 text-sm text-white/70">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
