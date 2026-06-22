import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheckCircle,
  FaChevronDown,
  FaChevronRight,
  FaClock,
  FaPlay,
} from "react-icons/fa";

import Spinner from "../components/common/Spinner";
import {
  getFullDetailsOfCourse,
  markLectureAsComplete,
} from "../services/operations/courseDetailsApi";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import { formatDuration } from "../utils/dateFormatter";

const flattenLectures = (sections = []) =>
  sections.flatMap((section) =>
    (section.subSection || []).map((lecture) => ({
      ...lecture,
      sectionId: section._id,
      sectionName: section.sectionName,
    }))
  );

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseSectionData, courseEntireData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );

  const [loading, setLoading] = useState(true);
  const [activeSectionIds, setActiveSectionIds] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      setError("");

      const response = await getFullDetailsOfCourse(courseId);

      if (!response?.success && response?.message) {
        setError(response.message);
        setLoading(false);
        return;
      }

      const courseData = response || {};
      const sections = courseData.courseContent || [];
      const lectures = flattenLectures(sections);

      dispatch(setEntireCourseData(courseData));
      dispatch(setCourseSectionData(sections));
      dispatch(setTotalNoOfLectures(lectures.length));
      dispatch(setCompletedLectures((courseData.completedVideos || []).map(String)));

      setActiveSectionIds(sections[0]?._id ? [sections[0]._id] : []);
      setSelectedLecture(lectures[0] || null);
      setLoading(false);
    };

    loadCourse();
  }, [courseId, dispatch]);

  const allLectures = useMemo(
    () => flattenLectures(courseSectionData || []),
    [courseSectionData]
  );

  const completedSet = useMemo(
    () => new Set((completedLectures || []).map(String)),
    [completedLectures]
  );

  const progressPercentage = allLectures.length
    ? Math.round((completedSet.size / allLectures.length) * 100)
    : 0;

  const toggleSection = (sectionId) => {
    setActiveSectionIds((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId]
    );
  };

  const handleMarkComplete = async () => {
    if (!selectedLecture || completedSet.has(String(selectedLecture._id))) return;

    setIsCompleting(true);
    const success = await markLectureAsComplete({
      courseId,
      subSectionId: selectedLecture._id,
    });

    if (success) {
      dispatch(
        setCompletedLectures([
          ...(completedLectures || []).map(String),
          String(selectedLecture._id),
        ])
      );
    }
    setIsCompleting(false);
  };

  const goToAdjacentLecture = (direction) => {
    if (!selectedLecture) return;
    const currentIndex = allLectures.findIndex(
      (lecture) => String(lecture._id) === String(selectedLecture._id)
    );
    const nextLecture = allLectures[currentIndex + direction];
    if (nextLecture) {
      setSelectedLecture(nextLecture);
      if (!activeSectionIds.includes(nextLecture.sectionId)) {
        setActiveSectionIds((current) => [...current, nextLecture.sectionId]);
      }
    }
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-orange-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-xl border border-orange-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-vd-secondary">Course unavailable</h1>
          <p className="mt-3 text-sm text-vd-txt">{error}</p>
          <button
            onClick={() => navigate("dashboard/enrolled-courses")}
            className="mt-6 rounded-lg bg-[#F9872C] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-vd-secondary"
          >
            Back to enrolled courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              to="/dashboard/enrolled-courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-vd-secondary transition hover:text-[#F9872C]"
            >
              <FaArrowLeft className="text-xs" />
              Enrolled courses
            </Link>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-vd-secondary md:text-3xl">
              {courseEntireData?.courseName}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-vd-txt">
              {selectedLecture
                ? `${selectedLecture.sectionName} / ${selectedLecture.title}`
                : "No lectures have been added yet."}
            </p>
          </div>

          <div className="min-w-[220px]">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-vd-secondary">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#F9872C] transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <main className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="aspect-video bg-slate-950">
              {selectedLecture?.videoUrl ? (
                <video
                  key={selectedLecture._id}
                  src={selectedLecture.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full bg-black object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-300">
                  Select a lecture to start watching.
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F9872C]">
                    <FaPlay className="text-[10px]" />
                    Now playing
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-vd-secondary">
                    {selectedLecture?.title || "No lecture selected"}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-vd-txt">
                    {selectedLecture?.description || "Choose a lecture from the course curriculum."}
                  </p>
                </div>

                <button
                  onClick={handleMarkComplete}
                  disabled={
                    !selectedLecture ||
                    completedSet.has(String(selectedLecture?._id)) ||
                    isCompleting
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#F9872C] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-vd-secondary disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <FaCheckCircle className="text-xs" />
                  {completedSet.has(String(selectedLecture?._id))
                    ? "Completed"
                    : isCompleting
                      ? "Saving..."
                      : "Mark complete"}
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  onClick={() => goToAdjacentLecture(-1)}
                  disabled={
                    !selectedLecture ||
                    allLectures.findIndex((lecture) => lecture._id === selectedLecture._id) === 0
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-vd-secondary transition hover:border-[#F9872C] hover:text-[#F9872C] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => goToAdjacentLecture(1)}
                  disabled={
                    !selectedLecture ||
                    allLectures.findIndex((lecture) => lecture._id === selectedLecture._id) === allLectures.length - 1
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-vd-secondary transition hover:border-[#F9872C] hover:text-[#F9872C] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </main>

          <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:max-h-[calc(100vh-120px)] lg:sticky lg:top-20">
            <div className="border-b border-slate-100 p-5">
              <h2 className="flex items-center gap-2 text-base font-bold text-vd-secondary">
                <FaBookOpen className="text-[#F9872C]" />
                Course curriculum
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {allLectures.length} lecture{allLectures.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="max-h-[520px] overflow-y-auto">
              {courseSectionData?.map((section) => {
                const isOpen = activeSectionIds.includes(section._id);

                return (
                  <div key={section._id} className="border-b border-slate-100 last:border-0">
                    <button
                      onClick={() => toggleSection(section._id)}
                      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-orange-50/60"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-vd-secondary">
                          {section.sectionName}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {section.subSection?.length || 0} lecture
                          {(section.subSection?.length || 0) !== 1 ? "s" : ""}
                        </span>
                      </span>
                      {isOpen ? (
                        <FaChevronDown className="shrink-0 text-xs text-[#F9872C]" />
                      ) : (
                        <FaChevronRight className="shrink-0 text-xs text-slate-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="bg-slate-50/60 px-3 pb-3">
                        {section.subSection?.map((lecture) => {
                          const isSelected =
                            String(selectedLecture?._id) === String(lecture._id);
                          const isDone = completedSet.has(String(lecture._id));

                          return (
                            <button
                              key={lecture._id}
                              onClick={() =>
                                setSelectedLecture({
                                  ...lecture,
                                  sectionId: section._id,
                                  sectionName: section.sectionName,
                                })
                              }
                              className={`mb-2 flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition ${
                                isSelected
                                  ? "bg-white text-vd-secondary shadow-sm ring-1 ring-orange-200"
                                  : "text-slate-600 hover:bg-white"
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                                  isDone
                                    ? "bg-emerald-100 text-emerald-600"
                                    : isSelected
                                      ? "bg-orange-100 text-[#F9872C]"
                                      : "bg-slate-200 text-slate-500"
                                }`}
                              >
                                {isDone ? <FaCheckCircle /> : <FaPlay />}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold leading-5">
                                  {lecture.title}
                                </span>
                                {lecture.timeDuration && (
                                  <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                    <FaClock className="text-[10px]" />
                                    {formatDuration(lecture.timeDuration)}
                                  </span>
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
