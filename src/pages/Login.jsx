import React from 'react';
import Template from "../components/core/Auth/Template";
import LoginImg from "../assets/images/login.webp";
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

const Login = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
      const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
      );
    
      if (authLoading || profileLoading) {
        return (
          <Spinner />
        );
      }
  return (
    <Template
      title={
        <>
          Welcome Back to <span className="text-vd-primary">Vidyawati</span>
        </>
      }
      desc1="Continue your learning journey with us."
      desc2="Access your courses, track progress, and achieve your goals."
      formType="login"
      image={LoginImg}
    />
  )
}

export default Login