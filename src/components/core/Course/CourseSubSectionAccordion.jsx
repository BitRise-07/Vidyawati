import React from "react"
import { FaLock, FaRegFileAlt } from "react-icons/fa"
import { formatDuration } from "../../../utils/dateFormatter"

function CourseSubSectionAccordion({ subSec }) {
  const isPreview = subSec?.isPreview || subSec?.title?.toLowerCase().includes("preview")

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white hover:bg-slate-50 transition-colors duration-150 cursor-pointer group">
      {/* Left — icon + title */}
      <div className="flex items-center gap-3 min-w-0">
        <FaRegFileAlt className="text-slate-400 text-sm shrink-0" />
        <span className="text-sm text-slate-700 truncate group-hover:text-slate-900 transition-colors">
          {subSec?.title}
        </span>
      </div>

      {/* Right — duration + preview/lock */}
      <div className="flex items-center gap-3 shrink-0 ml-4">
        {subSec?.timeDuration && (
          <span className="text-xs border border-orange-300 text-orange-500 px-2 py-0.5 rounded">
            {formatDuration(subSec.timeDuration)} minutes
          </span>
        )}
        {isPreview ? (
          <span className="text-xs border border-cyan-400 text-cyan-500 px-2 py-0.5 rounded">
            Preview
          </span>
        ) : (
          <FaLock className="text-slate-300 text-xs" />
        )}
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion