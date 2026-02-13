import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { setTotalItems } from "../../slices/cartSlice";

const {
  SENDOTP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  SIGNUP_API,
} = endpoints;

const { CHANGE_PASSWORD_API } = settingsEndpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function resendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Resent Successfully");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Resend OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export const signup = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate,
  setIsVerified,
  setOtpError,
  setErrorMessage
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error("Invalid OTP");
      }

      toast.success("Email Verified Successfully");
      setIsVerified(true);
      navigate("/login");
    } catch (error) {
      toast.error("Invalid OTP");
      setOtpError(true);
      setErrorMessage("Incorrect OTP. Please try again.");
    }

    dispatch(setLoading(false));
  };
};

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      const cartCount = Number(response.data.cartCount) || 0;
      dispatch(setTotalItems(cartCount));
      localStorage.setItem(
        "totalItems",
        JSON.stringify(cartCount)
      );
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
    dispatch(setLoading(false));
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password reset email sent successfully.");
      setEmailSent(true);
    } catch (error) {
      console.log("GET PASSWORD RESET TOKEN API ERROR............", error);
      toast.error("Failed to send password reset email.");
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully.");
    } catch (error) {
      console.log("RESET PASSWORD API ERROR............", error);
      toast.error("Failed to reset password.");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function changePassword(
  token,
  password,
  newPassword,
  confirmNewPassword,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Changing password...");

    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        {
          password,
          newPassword,
          confirmNewPassword,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password changed successfully. Please login again.");
      navigate("/login");
    } catch (error) {
      console.error("CHANGE PASSWORD API ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
