import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStar';
import GetAvgRating from '../../../utils/avgRating';
import { FaUser, FaBookOpen, FaClock, FaArrowRight, FaPlay } from 'react-icons/fa';

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  const formatPrice = (price) => {
    if (price === 0 || !price) return 'Free';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isFree = course?.price === 0 || !course?.price;
  const reviewCount = Number(avgReviewCount || 0).toFixed(1);

  return (
    <Link
      to={`/courses/${course._id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-orange-100/70 hover:-translate-y-1.5 transition-all duration-300 ease-out"
    >
      {/* ── Thumbnail ── */}
      <div className="relative overflow-hidden shrink-0">
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className={`w-full ${Height} object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]`}
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-400" />

        {/* Price badge */}
        <div
          className={`absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide shadow-lg ${
            isFree
              ? 'bg-emerald-500 text-white'
              : 'bg-gradient-to-r from-[#F9872C] to-orange-400 text-white'
          }`}
        >
          {formatPrice(course?.price)}
        </div>

        {/* Category badge */}
        {course?.category?.name && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-lg border border-white/50 shadow-md">
            {course.category.name}
          </div>
        )}

        {/* Play button — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-white/95 shadow-xl flex items-center justify-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
            <FaPlay className="text-[#F9872C] text-sm ml-0.5" />
          </div>
        </div>

        {/* Bottom enroll CTA — slides up */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="flex items-center justify-center gap-2 bg-[#F9872C] text-white text-xs font-bold py-2.5 tracking-wider uppercase">
            Enroll Now <FaArrowRight className="text-[9px]" />
          </div>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Title */}
        <h3 className="text-[14.5px] font-bold text-slate-800 leading-snug line-clamp-2 min-h-[44px] group-hover:text-[#F9872C] transition-colors duration-200">
          {course?.courseName}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
            <FaUser className="text-[9px] text-orange-500" />
          </div>
          <p className="text-xs text-slate-500 font-medium truncate">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-extrabold text-slate-700 tabular-nums">{reviewCount}</span>
          <RatingStars Review_Count={avgReviewCount} />
          <span className="text-xs text-slate-400">
            ({course?.ratingAndReviews?.length || 0} reviews)
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-orange-100 via-slate-100 to-transparent mt-auto" />

        {/* Meta row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <FaBookOpen className="text-orange-400 text-[10px] shrink-0" />
            <span>{course?.courseContent?.length || 0} Lessons</span>
          </div>
          <div className="w-px h-3 bg-slate-200 shrink-0" />
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <FaClock className="text-blue-400 text-[10px] shrink-0" />
            <span>{course?.duration || '15h'}</span>
          </div>
          {/* Arrow button */}
          <div className="ml-auto w-6 h-6 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center group-hover:bg-[#F9872C] group-hover:border-[#F9872C] transition-all duration-200 shrink-0">
            <FaArrowRight className="text-[8px] text-orange-400 group-hover:text-white transition-colors duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;