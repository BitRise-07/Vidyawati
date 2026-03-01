import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from "./AddCourse/RenderSteps";
import Spinner from "../../common/Spinner";
import { getFullDetailsOfCourse } from '../../../services/operations/courseDetailsApi';
import { setCourse, setEditCourse } from '../../../slices/courseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = React.useState(false);

    useEffect(() =>{
        const fetchCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId);

            if(result){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }
            console.log("Course: ", course);
            setLoading(false);
        }

        fetchCourseDetails();


    }, [])


    if(loading){
        return <Spinner />;
    }


  return (
    <div>
        <h1 className="text-3xl  font-bold text-vd-secondary mb-2">
              Edit <span className="bg-gradient-to-r from-[#F9872C] to-orange-500 bg-clip-text text-transparent">Course</span>
            </h1>
        <div className='px-5'>
            {course ? (<RenderSteps /> ):(<p>Course not found</p>)}
        </div>
      
    </div>
  )
}

export default EditCourse
