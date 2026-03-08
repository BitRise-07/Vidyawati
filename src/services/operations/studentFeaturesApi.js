import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/images/logo_main.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(courses, userDetail, navigate, dispatch) {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load.", { id: toastId });
      return;
    }

    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {
      courses,
    });
    if (!orderResponse.data.success) {
      throw new Error("Failed to create order.");
    }


    //options for razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "Vidyawati",
      description: "Thank you for purchasing the course.",
      image: rzpLogo,
      prefill: {
        name: `${userDetail.firstName} ${userDetail.lastName}`,
        email: userDetail.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(response, orderResponse.data.data.amount);
        verifyPayment({ ...response, courses }, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log(error);
    toast.error("Error in processing payment.");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount) {
  try {
    await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount,
    });
  } catch (error) {
    console.log("Error in sending payment success email", error);
  }
}

async function verifyPayment(bodyData, navigate, dispatch) {
  const toastId = toast.loading("Verifying payment...");
  dispatch(setPaymentLoading(true));
  try {
    const verifyResponse = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      bodyData,
    );
    if (verifyResponse.data.success) {
      toast.success("Payment successful! Course enrolled.");
      navigate("/dashboard/enrolled-courses");
      dispatch(resetCart());
    } else {
      toast.error("Payment verification failed. Please contact support.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Error in verifying payment. Please contact support.");
  }
  dispatch(setPaymentLoading(false));
  toast.dismiss(toastId);
}
