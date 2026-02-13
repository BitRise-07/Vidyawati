const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const sendEmail = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../email/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const mailSender = require("../utils/mailSender");

exports.capturePayment = async (req, res) => {
  //get courseId and userId
  const { courseId } = req.body;
  const userId = req.user.id;
  //validation: validate courseid and courseDetails
  if (!courseId) {
    return res.json({
      success: false,
      message: "Please provide valid course id",
    });
  }

  let course;
  try {
    course = Course.findById(courseId);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the course",
      });
    }
    //check user already pay for the same course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "User already enrolled",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  //create order
  const amount = course.price;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      course_id: courseId,
      userId,
    },
  };

  try {
    // initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);

    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Could not initiate payment",
    });
  }

};

// verify signature of razorpay and server/ enroll student into course

exports.verifySignature = async (req, res) => {
  const webhookSecret = "1234578";
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if(signature == digest){
    console.log("Payment is authorized");
    const {courseId, userId} = req.body.payload.payment.entity.notes;

    try{
      //fullfill the action

      //find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
                                      {_id:courseId},
                                      {$push:{studentsEnrolled:userId}},
                                      {new:true},
      
      
      );

      if(!enrolledCourse){
        return res.status(500).json({
          success:false,
          message:"Course not found",
        });
      }
      console.log(enrolledCourse);

      //find student and add course into their enrolled courses
      const enrolledStudent = await User.findOneAndUpdate(
                                      {_id:userId},
                                      {$push:{courses:courseId}},
                                      {new:true},
      )

      const emailResponse = await mailSender(
                        enrolledStudent.email,
                        "Congratulation from StudyNotion",
                        "Congratulations, you onboard into StudyNotion course"
      );
      console.log(emailResponse);
      return res.status(200).json({
        success:true,
        message:"Signature is verified and course is added"
      });

    }
    catch(error){
      console.log(error);
      return res.status(500).json({
        succes:false,
        message:error.message,
      });
    }
  }else{
    return res.status(400).json({
      success:false,
      message:"Request is invalid"
    });
  }
}
