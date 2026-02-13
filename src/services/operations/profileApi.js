import React from 'react'
import { profileEndpoints } from '../apis'
import { apiConnector } from '../apiConnector'
import toast from 'react-hot-toast'
import { setLoading, setUser } from "../../slices/profileSlice" 
import { logout } from './authApi'

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints;


export async function getUserEnrolledCourses() {
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
  } catch (error) {
    toast.error("Could not fetch enrolled courses");
  }

  return result;
}
