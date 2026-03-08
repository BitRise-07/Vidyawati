import { useEffect, useRef, useState } from "react"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
import { formatDuration } from "../../../utils/dateFormatter"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)
  const [active, setActive] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive, course._id])

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  const totalMins = course.subSection.reduce(
    (acc, sec) => acc + (parseFloat(sec.timeDuration) || 0), 0
  )

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Section header */}
      <div
        className={"flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors duration-150 " +
          (active ? "bg-slate-50" : "bg-white hover:bg-slate-50")}
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-3">
          <span className="text-[#F9872C] shrink-0">
            {active ? <AiOutlineMinus className="text-sm" /> : <AiOutlinePlus className="text-sm" />}
          </span>
          <span className={"text-sm font-semibold " + (active ? "text-[#0f1b3d]" : "text-slate-700")}>
            {course?.sectionName}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
          <span>{course.subSection.length} lecture{course.subSection.length !== 1 ? "s" : ""}</span>
          {totalMins > 0 && <span>{formatDuration(totalMins)} min</span>}
        </div>
      </div>

      {/* Sub-sections */}
      <div
        ref={contentEl}
        className="overflow-hidden transition-all duration-300"
        style={{ height: sectionHeight }}
      >
        <div className="divide-y divide-slate-100">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion key={i} subSec={subSec} />
          ))}
        </div>
      </div>
    </div>
  )
}