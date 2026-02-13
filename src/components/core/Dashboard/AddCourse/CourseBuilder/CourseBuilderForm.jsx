import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoAddCircleSharp } from "react-icons/io5";
import { FaArrowCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setEditCourse } from '../../../../../slices/courseSlice';
import { toast } from 'react-toastify';
import { createSection } from '../../../../../services/operations/courseDetailsApi';;

const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState:{errors}} = useForm();

  const [editingSection, setEditingSection] = useState(null);
  const {course} = useSelector(state => state.course);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));

  }
  const goToNext = () => {
    if(course.courseContent.length === 0) {
      toast.error("Please add at least one section to proceed");
      return;
    }
    if(course.courseContent.some(section => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture to each section to proceed");
      return;
    }

    dispatch(setStep(3));
  }


  return (
    <div>
      
      <p>Course Builder</p>

      <form onSubmit={handleSubmit(handleSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section name<sup>*</sup></label>
          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", {required: true})}
           />
           {errors.sectionName && <p>Section name is required</p>}
        </div>

        <div>
          <button type='submit'>{editingSection ? "Edit Section Name" : "Create Section"} <IoAddCircleSharp /></button>
          {editingSection && <button type='button' onClick={() => {setEditingSection(null); setValue("sectionName", "")}}>Cancel Edit</button>}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView />
      )}

      <div>
        <button onClick={goBack}>Back</button>


        <button onClick={goToNext} >Next <FaArrowCircleRight /></button>
      </div>
    </div>
  )
}

export default CourseBuilderForm
 