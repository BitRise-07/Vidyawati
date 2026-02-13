import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
import Spinner from "../../common/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses();
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div>
      <div>Enrolled Courses</div>
      {!enrolledCourses ? (
        <Spinner />
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled in any course yet</p>
      ) : (
        <div>
          <div>
            <p>Course name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>

          {enrolledCourses.map((course, index) => {
            <div>
              <div>
                <img src={course.thumbnail} />
                <div>
                  <p>{course.courseName}</p>
                  <p>{course.courseDescription}</p>
                </div>
              </div>

              <div>{course?.totalDuration}</div>

              <div>
                <p>Progress {course.progressPercentage || 0}</p>

                <ProgressBar completed={course.progressPercentage || 0} />
              </div>
            </div>;
          })}
        </div>
      )}
        
    
    </div>
  );
};

export default EnrolledCourses;
