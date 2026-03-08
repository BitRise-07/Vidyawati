const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const {courseEnrollmentEmail} = require("../email/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const mailSender = require("../utils/mailSender");
const {paymentSuccessEmail} = require("../email/templates/paymentSuccessEmail");
const crypto = require("crypto");



exports.capturePayment = async (req, res) => {

  const { courses } = req.body;
  const userId = req.user.id;

  if(courses.length === 0){
    return res.json({
      success:false,
      message:"Please provide course details"
    })
  }

  let totalAmount = 0;
  for(const course_id of courses){
    let course;
    try{
      course = await Course.findById(course_id);
      if(!course){
        return res.json({
          success:false,
          message:"Could not find the course"
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if(course.studentsEnrolled.includes(uid)){
        return res.status(200).json({
          success:false,
          message:"User already enrolled in course: "+course.courseName,
        });
      }

      totalAmount += course.price;
    }
    catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:error.message,
      });

    }


  }

  const options = {
    amount: totalAmount*100,
    currency:"INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try{
    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({
      success:true,
      data:paymentResponse,
      message:"Payment initiated successfully",
    });
  }
  catch(error){
    console.error(error);
    res.status(500).json({
      success:false,
      message:"Could not initiate payment",
    });
  }


}

// verify payment

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body.razorpay_order_id;
  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_signature = req.body.razorpay_signature;


  const courses = req.body?.courses;
  const userId = req.user.id;

  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
    return res.status(400).json({
      success:false,
      message:"Please provide all the details",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

  if(expectedSignature === razorpay_signature){
    //enroll the student into courses
    await enrollStudents(courses, userId, res);


    return res.status(200).json({
      success:true,
      message:"Payment verified successfully",
    });
    
  }

  return res.status(400).json({
    success:false,
    message:"Payment failed",
  });
}


const enrollStudents = async (courses, userId, res) => {

  if(!courses || courses.length === 0 || !userId){
    return res.status(400).json({
      success:false,
      message:"Please provide all the details",
    });
  }

  for(const courseId of courses){
    try{
      const enrolledCourse = await Course.findOneAndUpdate(
      {_id:courseId},
      {$push:{studentsEnrolled:userId}},
      {new:true},
    )

    if(!enrolledCourse){
      return res.status(500).json({
        success:false,
        message:"Course not found",
      });
      }

      const enrolledStudent = await User.findOneAndUpdate(
        {_id:userId},
        {$push:{courses:courseId}},
        {new:true},
      )

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from Vidyawati",
        courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`),
      );
  }  catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:error.message,
      });
    }

  }

  return res.status(200).json({
    success:true,
    message:"Student enrolled in courses successfully",
  });
}

exports.sendPaymentSuccessEmail = async (req, res) => {

  const {orderId, paymentId, amount} = req.body;
  const userId = req.user.id;

  if(!orderId || !paymentId || !amount || !userId){
    return res.status(400).json({
      success:false,
      message:"Please provide all the details",
    });
  }

  try{
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      "Payment Received - Vidyawati",
      paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`, amount/100, orderId, paymentId)
      
    )
  }
  catch(error){
    console.error(error);
    return res.status(500).json({
      success:false,
      message:"Could not send email",
    });
  }
}




//For single course purchase, we will create order and then verify the signature and then enroll the student into course

// exports.capturePayment = async (req, res) => {
//   //get courseId and userId
//   const { courseId } = req.body;
//   const userId = req.user.id;
//   //validation: validate courseid and courseDetails
//   if (!courseId) {
//     return res.json({
//       success: false,
//       message: "Please provide valid course id",
//     });
//   }

//   let course;
//   try {
//     course = Course.findById(courseId);
//     if (!course) {
//       return res.json({
//         success: false,
//         message: "Could not find the course",
//       });
//     }
//     //check user already pay for the same course
//     const uid = new mongoose.Types.ObjectId(userId);
//     if (course.studentsEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "User already enrolled",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
//   //create order
//   const amount = course.price;
//   const currency = "INR";
//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       course_id: courseId,
//       userId,
//     },
//   };

//   try {
//     // initiate the payment using razorpay
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);

//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Could not initiate payment",
//     });
//   }

// };

// // verify signature of razorpay and server/ enroll student into course

// exports.verifySignature = async (req, res) => {
//   const webhookSecret = "1234578";
//   const signature = req.headers["x-razorpay-signature"];

//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if(signature == digest){
//     console.log("Payment is authorized");
//     const {courseId, userId} = req.body.payload.payment.entity.notes;

//     try{
//       //fullfill the action

//       //find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//                                       {_id:courseId},
//                                       {$push:{studentsEnrolled:userId}},
//                                       {new:true},
      
      
//       );

//       if(!enrolledCourse){
//         return res.status(500).json({
//           success:false,
//           message:"Course not found",
//         });
//       }
//       console.log(enrolledCourse);

//       //find student and add course into their enrolled courses
//       const enrolledStudent = await User.findOneAndUpdate(
//                                       {_id:userId},
//                                       {$push:{courses:courseId}},
//                                       {new:true},
//       )

//       const emailResponse = await mailSender(
//                         enrolledStudent.email,
//                         "Congratulation from StudyNotion",
//                         "Congratulations, you onboard into StudyNotion course"
//       );
//       console.log(emailResponse);
//       return res.status(200).json({
//         success:true,
//         message:"Signature is verified and course is added"
//       });

//     }
//     catch(error){
//       console.log(error);
//       return res.status(500).json({
//         succes:false,
//         message:error.message,
//       });
//     }
//   }else{
//     return res.status(400).json({
//       success:false,
//       message:"Request is invalid"
//     });
//   }
// }
