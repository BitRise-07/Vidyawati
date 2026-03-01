import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApi';
import CourseTable from './instructorCourses/CourseTable';


const MyCourses = () => {


    const navigate = useNavigate();
    const [courses,setCourses] = useState([]);


    useEffect(() =>{
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses();
            if(result){
                setCourses(result);
            }
        }
        fetchCourses();
    },[])


  return (
    <div>

      

        {courses.length > 0 && <CourseTable courses={courses} setCourses={setCourses} />}
      
    </div>
  )
}

export default MyCourses
