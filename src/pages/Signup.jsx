import React from 'react';
import Template from "../components/core/Auth/Template";
import SignupImg from "../assets/images/signup.webp";

const Signup = () => {
  return (
    <Template
      title={
        <>
          Join the millions learning to<br />
          code with <span className="text-vd-primary">Vidyawati</span> for free
        </>
      }
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      formType="signup"
      image={SignupImg}
    />
  )
}

export default Signup;