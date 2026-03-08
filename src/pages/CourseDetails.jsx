import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, Link } from "react-router-dom"
import { FaClock, FaSignal, FaBookOpen, FaRupeeSign, FaUsers, FaStar, FaChevronRight } from "react-icons/fa"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStar"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formattedDate } from "../utils/dateFormatter"
import GetAvgRating from "../utils/avgRating"
import Error from "../pages/Error"
import { fetchCourseDetails } from "../services/operations/courseDetailsApi"
import { buyCourse } from "../services/operations/studentFeaturesApi"

const TABS = ["Curriculum", "Overview", "Instructor", "FAQs", "Reviews"]

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { courseId } = useParams()
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isActive, setIsActive] = useState([])
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  const [activeTab, setActiveTab] = useState("Curriculum")

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        console.log(res)
        
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  useEffect(() => {
    if (response?.data) {
      const count = GetAvgRating(response?.data.ratingAndReviews || [])
      setAvgReviewCount(count)
      let lectures = 0
      response?.data.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0
      })
      setTotalNoOfLectures(lectures)
    }
  }, [response])

  const handleActive = (id) => {
    setIsActive(!isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id))
  }

  const handleBuyCourse = () => {
    if (user) {
      buyCourse([courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (loading || !response) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-orange-100 border-t-[#F9872C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500 font-medium">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!response.success) return <Error />

  const {
    _id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent = [],
    instructor = {},
    studentsEnrolled = [],
    ratingAndReviews = [],
    updatedAt,
  } = response?.data || {}

  return (
    <div className="bg-orange-50">
      <div className="bg-vd-secondary text-white relative  pt-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb inside hero */}
          <div className="flex items-center gap-2 text-xs text-slate-400 py-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <FaChevronRight className="text-[9px] opacity-50" />
            <span className="text-slate-300">Course Details</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-10 pb-10">
            {/* Left — course info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                {courseName}
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xl">
                {courseDescription}
              </p>

              {/* Instructor + rating row */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2.5">
                  <img
                    src={instructor.image || `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`}
                    alt={instructor.firstName}
                    className="w-8 h-8 rounded-full border border-slate-500 object-cover"
                  />
                  <span className="text-slate-300 font-medium">
                    {instructor.firstName} {instructor.lastName}
                  </span>
                </div>

                <span className="text-slate-600">|</span>

                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-400 font-bold">{Number(avgReviewCount).toFixed(1)}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={14} />
                </div>

                <span className="text-slate-600">|</span>

                <span className="text-slate-400 text-xs">
                  Last Updated : {formattedDate(updatedAt)}
                </span>
              </div>
            </div>

            {/* Right — course card (desktop, overlapping hero) */}
            <div className="hidden lg:block relative">
  <div className="absolute right-0  w-[340px]">
    <CourseDetailsCard
      course={response?.data}
      setConfirmationModal={setConfirmationModal}
      handleBuyCourse={handleBuyCourse}
      totalDuration={response.data?.totalDuration}
      totalLectures={totalNoOfLectures}
    />
  </div>
</div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Left */}
          <div>
            {/* Tab bar */}
            <div className="flex border-b border-slate-200 mb-6 overflow-x-auto ">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={"relative px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer " +
                    (activeTab === tab ? "text-[#0f1b3d]" : "text-slate-400 hover:text-slate-600")}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f1b3d] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Curriculum tab */}
            {activeTab === "Curriculum" && (
              <div>
                <div className="flex items-center justify-between mb-4 ">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{courseContent.length} chapters</span>
                    <span>·</span>
                    <span>{totalNoOfLectures} lectures</span>
                  </div>
                  <button
                    onClick={() => setIsActive([])}
                    className="text-xs text-[#F9872C] font-semibold hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    Collapse all
                  </button>
                </div>
                <div className="space-y-2">
                  {courseContent?.map((section) => (
                    <CourseAccordionBar
                      key={section._id}
                      course={section}
                      isActive={isActive}
                      handleActive={handleActive}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Overview tab */}
            {activeTab === "Overview" && (
              <div className="prose prose-sm max-w-none text-slate-700">
                <h3 className="text-lg font-bold text-slate-800 mb-3">What you'll learn</h3>
                <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
              </div>
            )}

            {/* Instructor tab */}
            {activeTab === "Instructor" && (
              <div className="flex items-start gap-5 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                <img
                  src={instructor.image || `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`}
                  alt={instructor.firstName}
                  className="w-16 h-16 rounded-full border-2 border-orange-200 object-cover shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-800">{instructor.firstName} {instructor.lastName}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{instructor?.additionalDetail?.about || "No bio available."}</p>
                </div>
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === "Reviews" && (
              <div className="text-sm text-slate-500 py-8 text-center">
                {ratingAndReviews.length
                  ? `${ratingAndReviews.length} reviews for this course`
                  : "No reviews yet."}
              </div>
            )}

            {/* FAQs tab */}
            {activeTab === "FAQs" && (
              <div className="text-sm text-slate-500 py-8 text-center">No FAQs available.</div>
            )}
          </div>

          {/* Right — sticky card (mobile shows here) */}
          <div className="lg:hidden">
            <CourseDetailsCard
              course={response?.data}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
              totalDuration={response.data?.totalDuration}
              totalLectures={totalNoOfLectures}
            />
          </div>

          {/* Desktop: empty spacer (card is in hero) */}
          <div className="hidden lg:block" />
        </div>
      </div>

     <div className="mt-100">
       <Footer  />
     </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails