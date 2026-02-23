import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { FaRegEdit, FaChevronDown, FaChevronUp, FaVideo, FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineOndemandVideo } from "react-icons/md";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsApi";
import { setCourse, setEditCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [expandedSections, setExpandedSections] = useState({});
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      courseId: course._id,
      sectionId
    });

    if(result){
      const updatedCourseContent  = course.courseContent.filter((section) => section._id !== sectionId);

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      sectionId,
      subSectionId
    });
    if(result){
      const updatedCourseContent  = course.courseContent.map((section) => section._id === sectionId ? result : section);

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };


  
  return (
    <div className="space-y-4">
      {course?.courseContent?.map((section) => (
        <div
          key={section._id}
          className="border border-orange-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all duration-300"
        >
          {/* Section Header */}
          <div onClick={() => toggleSection(section._id)} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-white border-b border-orange-100 cursor-pointer">
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => toggleSection(section._id)}
                className="p-2 hover:bg-orange-100 rounded-lg transition-colors duration-300"
              >
                {expandedSections[section._id] ? (
                  <FaChevronUp className="text-vd-muted cursor-pointer" />
                ) : (
                  <FaChevronDown className="text-vd-muted cursor-pointer" />
                )}
              </button>
              
              <RxDropdownMenu className="text-xl text-orange-500" />
              <span className="font-semibold text-vd-secondary">
                {section.sectionName}
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                {section.subSection?.length || 0} lectures
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                className="p-2 text-gray-500 hover:text-vd-secondary hover:bg-blue-50 rounded-lg transition-all duration-300 cursor-pointer"
                title="Edit section"
              >
                <FaRegEdit className="text-sm" />
              </button>

              <button
                onClick={() => {
                  setConfirmationModal({
                    text1: "Delete this Section",
                    text2: "All lectures in this section will be permanently deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  });
                }}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 cursor-pointer"
                title="Delete section"
              >
                <RiDeleteBin6Line className="text-sm" />
              </button>
            </div>
          </div>

          {/* Sub Sections */}
          {expandedSections[section._id] && (
            <div className="p-4 bg-gray-50">
              {section.subSection?.map((data, index) => (
                <div
                  key={data._id}
                  className="group mb-2 last:mb-0 p-3 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                      onClick={() => setViewSubSection(data)}
                    >
                      <MdOutlineOndemandVideo className="text-lg text-orange-500" />
                      <span className="font-medium text-vd-secondary">
                        {data.title}
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Preview
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditSubSection({ ...data, sectionId: section._id });
                        }}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-300"
                        title="Edit lecture"
                      >
                        <FaRegEdit className="text-xs" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmationModal({
                            text1: "Delete this Lecture",
                            text2: "This lecture will be permanently deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-300"
                        title="Delete lecture"
                      >
                        <RiDeleteBin6Line className="text-xs" />
                      </button>
                    </div>
                  </div>

                  {data.description && (
                    <p className="mt-2 text-sm text-vd-muted line-clamp-2">
                      {data.description}
                    </p>
                  )}
                </div>
              ))}

              {/* Add Lecture Button */}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-3 w-full py-3 border-2 border-dashed border-orange-200 rounded-lg text-orange-500 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPlusCircle />
                <span className="font-medium">Add Lecture</span>
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Modals */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      )}
      
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default NestedView;