import React from "react";
import { useDispatch } from "react-redux";
import ReactStars from "react-stars";
import { FaStar, FaClock, FaUserGraduate, FaTag } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../services/operations/cartApi";
import { Link } from "react-router-dom";
import { setTotal } from "../../../../slices/cartSlice";
import { calculateCartTotal } from "../../../../utils/calculateTotal";

const RenderCartCourse = ({ cartItems, setCartItems }) => {
  const dispatch = useDispatch();

  const handleRemove = async (courseId) => {
  await dispatch(removeFromCart(courseId));

  const updatedCart = cartItems.filter(
    (item) => item._id !== courseId
  );

  setCartItems(updatedCart);

  dispatch(setTotal(calculateCartTotal(updatedCart)));
};


  if (!cartItems.length) return null;

  return (
    <div className="space-y-4 pr-15">
      {cartItems.map((course) => (
        <div
          key={course._id}
          className="group bg-white rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-40 h-40 md:h-auto overflow-hidden relative">
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Bestseller
              </div>
            </div>

          <div className="flex-1 p-4">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-vd-secondary hover:text-vd-primary transition">
                        <Link to={`/courses/${course._id}`}>
                          {course.courseName}
                        </Link>
                      </h3>
                      <p className="text-sm text-vd-muted mt-1 line-clamp-2">
                        {course.courseDescription}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(course._id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition cursor-pointer rounded-md hover:bg-red-50"
                    >
                      <RiDeleteBin6Line className="text-lg" />
                    </button>
                  </div>

                  {/* Course Meta */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 mb-4 text-sm text-vd-muted">
                    <div className="flex items-center gap-1">
                      <FaUserGraduate className="text-blue-500 text-xs" />
                      <span>{course.studentsEnroll2ed || "100+"}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FaClock className="text-green-500 text-xs" />
                      <span>{course.duration || "15h"}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FaTag className="text-purple-500 text-xs" />
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs">
                        {course.category?.name || "Development"}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-vd-secondary">
                      4.8
                    </span>
                    <ReactStars
                      count={5}
                      size={16}
                      edit={false}
                      value={4.8}
                      color2="#F9872C"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                    <span className="text-xs text-vd-muted">
                      ({course?.ratingAndReviews?.length || 5})
                    </span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-lg font-bold text-orange-500">
                    ₹{course.price}
                  </span>

                  <Link
                    to={`/courses/${course._id}`}
                    className="px-3 py-1.5 text-sm border border-vd-secondary text-vd-secondary rounded-md hover:bg-vd-secondary hover:text-white transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourse;
