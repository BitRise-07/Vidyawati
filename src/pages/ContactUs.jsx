import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../services/apiConnector";
import { contactusEndpoint } from "../services/apis";
import countrycode from "../data/countrycode.json";
import { FaHeadset, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaSpinner } from "react-icons/fa";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      console.log("Contact form submitted successfully", response.data);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.log("Error submitting contact form", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        message: "",
        firstname: "",
        lastname: "",
        phoneNo: "",
        countrycode: "+91"
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white rounded-full text-xs font-semibold mb-4">
            Contact Us
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-vd-secondary mb-4">
            Get in <span className="bg-gradient-to-r from-[#F9872C] to-orange-500 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-vd-txt max-w-xl mx-auto text-sm md:text-base">
            Have questions? We're here to help. Send us a message and we'll respond promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="group bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F9872C] to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <FaHeadset className="text-lg text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-secondary mb-2">Chat on Us</h3>
                    <p className="text-vd-txt text-sm mb-3">Our friendly team is here to help.</p>
                    <a 
                      href="mailto:teamvidyawati@gmail.com" 
                      className="inline-flex items-center gap-2 text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors duration-300"
                    >
                      <FaEnvelope className="text-sm" />
                      teamvidyawati@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-vd-secondary to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <FaPhone className="text-lg text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-secondary mb-2">Call Us</h3>
                    <p className="text-vd-txt text-sm mb-3">Mon to Fri 9am to 6pm</p>
                    <a 
                      href="tel:+91878908541" 
                      className="inline-flex items-center gap-2 text-vd-secondary text-sm font-medium hover:text-vd-primary transition-colors duration-300"
                    >
                      <FaPhone className="text-sm" />
                      +91 878908541
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <FaMapMarkerAlt className="text-lg text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-secondary mb-2">Visit Us</h3>
                    <p className="text-vd-txt text-sm mb-3">Our office location</p>
                    <p className="text-vd-secondary text-sm font-medium">
                      123 Learning Street<br />
                      Education District, Tech City 400001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-vd-secondary to-blue-900 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Email Response</span>
                  <span className="font-semibold">Within 24 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Phone Support</span>
                  <span className="font-semibold">Instant</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Live Chat</span>
                  <span className="font-semibold">Within 5 minutes</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-xs opacity-90">
                  We're committed to providing timely and helpful responses.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100">
              <h2 className="text-xl font-bold text-vd-secondary mb-2">Send a Message</h2>
              <p className="text-vd-txt text-sm mb-6">Fill out the form below and we'll get back to you soon.</p>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 text-sm">Message Sent!</h4>
                      <p className="text-green-700 text-xs">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 text-sm">Error</h4>
                      <p className="text-red-700 text-xs">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(submitContactForm)} className="space-y-5">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstname" className="block text-vd-secondary text-sm font-medium mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Enter first name"
                      {...register("firstname", { required: "First name is required" })}
                      className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                        errors.firstname 
                          ? "border-red-300 focus:border-red-500" 
                          : "border-orange-100 focus:border-orange-500"
                      } bg-orange-50/50 focus:bg-white transition-all duration-300 outline-none text-vd-secondary placeholder:text-vd-muted`}
                    />
                    {errors.firstname && (
                      <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1">
                        <span>⚠</span> {errors.firstname.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastname" className="block text-vd-secondary text-sm font-medium mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Enter last name"
                      {...register("lastname")}
                      className="w-full px-3 py-2.5 rounded-lg border border-orange-100 focus:border-orange-500 text-sm bg-orange-50/50 focus:bg-white transition-all duration-300 outline-none text-vd-secondary placeholder:text-vd-muted"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-vd-secondary text-sm font-medium mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                      errors.email 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-orange-100 focus:border-orange-500"
                    } bg-orange-50/50 focus:bg-white transition-all duration-300 outline-none text-vd-secondary placeholder:text-vd-muted`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1">
                      <span>⚠</span> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNo" className="block text-vd-secondary text-sm font-medium mb-1.5">
                    Phone Number *
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <select 
                        name="countrycode" 
                        id="countrycode"
                        {...register("countrycode", { required: true })}
                        className="w-full px-3 py-2.5 rounded-lg border border-orange-100 focus:border-orange-500 text-sm bg-orange-50/50 focus:bg-white transition-all duration-300 outline-none text-vd-secondary appearance-none"
                      >
                        {countrycode.map((element, index) => (
                          <option key={index} value={element.code}>
                            {element.country} ({element.code})
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-3 h-3 text-vd-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-2">
                      <input
                        type="tel"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="Enter phone number"
                        {...register("phoneNo", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid 10-digit phone number"
                          }
                        })}
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                          errors.phoneNo 
                            ? "border-red-300 focus:border-red-500" 
                            : "border-orange-100 focus:border-orange-500"
                        } bg-orange-50/50 focus:bg-white transition-all duration-300 outline-none text-vd-secondary placeholder:text-vd-muted`}
                      />
                    </div>
                  </div>
                  {errors.phoneNo && (
                    <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1">
                      <span>⚠</span> {errors.phoneNo.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-vd-secondary text-sm font-medium mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    {...register("message", { 
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters"
                      }
                    })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                      errors.message 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-orange-100 focus:border-orange-500"
                    } bg-orange-50/50 focus:bg-white transition-all duration-300 outline-none text-vd-secondary placeholder:text-vd-muted resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1">
                      <span>⚠</span> {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-3 px-6 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm cursor-pointer">
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                      </>
                    ) : submitted ? (
                      <>
                        <FaCheckCircle />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="group-hover:rotate-12 transition-transform duration-300 " />
                        Send Message
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#F9872C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#F9872C] to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FaEnvelope className="text-white text-sm" />
                    </div>
                    <h4 className="font-medium text-vd-secondary text-sm mb-1">Email Support</h4>
                    <p className="text-vd-txt text-xs">teamvidyawati@gmail.com</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-vd-secondary to-blue-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FaHeadset className="text-white text-sm" />
                    </div>
                    <h4 className="font-medium text-vd-secondary text-sm mb-1">Business Hours</h4>
                    <p className="text-vd-txt text-xs">Mon-Fri: 9AM-6PM</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FaMapMarkerAlt className="text-white text-sm" />
                    </div>
                    <h4 className="font-medium text-vd-secondary text-sm mb-1">Location</h4>
                    <p className="text-vd-txt text-xs">Tech City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ContactUs;