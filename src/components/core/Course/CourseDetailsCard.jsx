import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare, FaShoppingCart, FaClock, FaSignal, FaBookOpen, FaUsers, FaLanguage, FaPlay } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { addToCart } from "../../../services/operations/cartApi"

/* Info row inside card */
const InfoRow = ({ icon, label, value, valueClass = "font-bold text-slate-800" }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-2.5 text-slate-500">
      <span className="text-base">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
    <span className={"text-sm " + valueClass}>{value}</span>
  </div>
)

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse, totalDuration, totalLectures }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  if (!course) return null

  const { thumbnail, price, _id, studentsEnrolled = [], instructions = [] } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(_id))
      toast.success("Course added to cart!")
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const isEnrolled = user && studentsEnrolled.includes(user?._id)
  const isFree = price === 0 || !price

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-6">
      {/* Thumbnail with play button */}
      <div className="relative h-44 overflow-hidden group cursor-pointer">
        <img
          src={thumbnail}
          alt={course?.courseName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
            <FaPlay className="text-slate-800 text-lg ml-1" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Course Info</h3>

        {/* Info rows */}
        <div className="mb-4">
          <InfoRow
            icon={<span className="text-blue-400">💳</span>}
            label="Price"
            value={isFree ? "Free" : `₹${price}`}
            valueClass={"font-extrabold text-base " + (isFree ? "text-[#F9872C]" : "text-[#F9872C]")}
          />
          <InfoRow
            icon={<FaClock className="text-blue-400" />}
            label="Duration"
            value={totalDuration || "52 mins"}
          />
          <InfoRow
            icon={<FaSignal className="text-blue-400" />}
            label="Level"
            value="Expert"
          />
          <InfoRow
            icon={<FaBookOpen className="text-blue-400" />}
            label="Lectures"
            value={totalLectures ? `${totalLectures} Lectures` : "4 Lectures"}
          />
          <InfoRow
            icon={<FaLanguage className="text-blue-400" />}
            label="Language"
            value="English"
          />
          <InfoRow
            icon={<FaUsers className="text-blue-400" />}
            label="Enrolled"
            value={`${studentsEnrolled.length} Enrolled`}
          />
        </div>

        {/* CTA button */}
        <button
          onClick={isEnrolled ? () => navigate("/dashboard/enrolled-courses") : handleAddToCart}
          className="w-full py-3 bg-vd-primary hover:bg-vd-secondary text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg text-sm mb-3 cursor-pointer"
        >
          {isEnrolled ? "Go to Course" : "Add To Cart"}
        </button>

        {!isEnrolled && (
          <button
            onClick={handleBuyCourse}
            className="w-full py-3 border-2 border-[#F9872C] text-vd-primary font-bold rounded-xl hover:bg-orange-50 transition-all duration-200 text-sm cursor-pointer"
          >
            Buy Now
          </button>
        )}

        {/* Share */}
        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-vd-secondary transition-colors text-sm font-medium cursor-pointer"
          >
            <FaShareSquare className="text-xs" />
            Share This Course
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard