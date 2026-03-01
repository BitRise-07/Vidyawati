import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams, Link } from "react-router-dom";
import { fetchCourseCategories } from "../services/operations/courseDetailsApi";
import getCatalogPageData from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import { useMemo } from "react";
import Spinner from "../components/common/Spinner";
import {
  FaChevronRight,
  FaFire,
  FaStar,
  FaGraduationCap,
  FaUsers,
  FaBookOpen,
  FaArrowRight,
  FaTag,
} from "react-icons/fa";
import CourseSlider from "../components/core/Catalog/CourseSlider";

const TAB_GROUPS = {
  starter: ["All", "Most Popular", "New"],
};
const StatCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold leading-none">{value}</p>
      <p className="text-xs text-orange-200 mt-0.5">{label}</p>
    </div>
  </div>
);

const SectionHeader = ({ title, highlight, tabs, activeTab, onTabChange }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ">
    <h2 className="text-2xl font-bold text-slate-800">
      {title}
      {highlight && (
        <span className="ml-2 bg-gradient-to-r from-[#F9872C] to-orange-400 bg-clip-text text-transparent">
          {highlight}
        </span>
      )}
    </h2>
    {tabs && (
      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "bg-white text-[#F9872C] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    )}
  </div>
);

const EmptyState = ({ message }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
      <FaBookOpen className="text-2xl text-orange-300" />
    </div>
    <p className="text-slate-500 text-sm">
      {message || "No courses available yet."}
    </p>
  </div>
);

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [starterTab, setStarterTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const res = await fetchCourseCategories();
        const category_id = res?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName,
        )[0]?._id;
        setCategoryId(category_id);
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (err) {
        console.log("Error in fetching catalog page data", err);
      }
    };
    if (categoryId) getCategoryDetails();
  }, [categoryId]);

  const categoryName =
    catalogPageData?.data?.selectedCategory?.name ||
    catalogName
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");


  const selectedCourses = catalogPageData?.data?.selectedCategory?.courses || [];
const differentCourses =
  catalogPageData?.data?.differentCategory || [];
  const mostSelling = catalogPageData?.data?.mostSellingCourse || [];

  console.log("Selected course: ", selectedCourses);
  console.log("Different course: ", differentCourses);
  console.log("Most selling course: ", mostSelling);

  const starterCourses = useMemo(() => {
    if (!selectedCourses?.length) return [];

    switch (starterTab) {
      case "Most Popular":
        return [...selectedCourses]
          .sort(
            (a, b) =>
              (b.studentsEnrolled?.length || 0) -
              (a.studentsEnrolled?.length || 0),
          )
          .slice(0, 4);

      case "New":
        return [...selectedCourses]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

      case "All":
      default:
        return selectedCourses.slice(0, 4);
    }
  }, [starterTab, selectedCourses]);

  if (loading) {
    <Spinner />;
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#0f1b3d] via-[#162347] to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-blue-300 mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <FaChevronRight className="text-[10px] opacity-60" />
            <Link to="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <FaChevronRight className="text-[10px] opacity-60" />
            <span className="text-white font-medium">{categoryName}</span>
          </nav>

          {/* Hero body */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Icon badge */}
            <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-[#F9872C] to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <FaGraduationCap className="text-4xl text-white" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 text-xs font-semibold bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30 uppercase tracking-wider">
                  Category
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                {categoryName}
              </h1>
              <p className="text-blue-200 text-base max-w-2xl leading-relaxed">
                {catalogPageData?.data?.selectedCategory?.description ||
                  `Explore our comprehensive ${categoryName} courses designed to help you master new skills and advance your career.`}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-8" />

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            <StatCard
              icon={<FaBookOpen className="text-orange-300 text-sm" />}
              value={selectedCourses.length}
              label="Total Courses"
            />
            <StatCard
              icon={<FaStar className="text-yellow-400 text-sm" />}
              value="4.8"
              label="Avg. Rating"
            />
            <StatCard
              icon={<FaUsers className="text-blue-300 text-sm" />}
              value="12k+"
              label="Enrolled Students"
            />
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCourses.slice(0, 3).length > 0 ? (
              selectedCourses
                .slice(0, 3)
                .map((course, index) => (
                  <Course_Card
                    key={course._id || index}
                    course={course}
                    Height="h-[200px]"
                  />
                ))
            ) : (
              <EmptyState />
            )}
          </div>
        </section>

        {/* ── Section 2: Get Started ── */}
        <section>
          <SectionHeader
            title="Courses to Get You Started"
            tabs={TAB_GROUPS.starter}
            activeTab={starterTab}
            onTabChange={setStarterTab}
          />
          <CourseSlider courses={selectedCourses.slice(0, 6)} />
        </section>
        {/* ── Section 3: Top Courses ── */}
        <section>
          <SectionHeader title="Top Courses in" highlight={categoryName} />
          <CourseSlider courses={differentCourses} />
        </section>

        {/* ── Section 4: Frequently Bought Together ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-md shadow-purple-200">
              <FaFire className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Frequently Bought Together
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Curated bundles chosen by learners like you
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mostSelling.slice(0, 8).length > 0 ? (
              mostSelling
                .slice(0, 8)
                .map((course, index) => (
                  <Course_Card
                    key={course._id || index}
                    course={course}
                    Height="h-[180px]"
                  />
                ))
            ) : (
              <EmptyState message="No courses available." />
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
