import { setTotalItems, resetCart } from "../../slices/cartSlice";
import { apiConnector } from "../apiConnector";
import { cartEndpoints } from "../apis";
import { toast } from "react-hot-toast";


const { ADD_TO_CART_API, REMOVE_FROM_CART_API, GET_ALL_CART_API, CLEAR_CART_API } =
  cartEndpoints;

export function addToCart(courseId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", ADD_TO_CART_API(courseId));

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const cartCount = Number(response.data.cartCount) || 0;

      dispatch(setTotalItems(cartCount));
      localStorage.setItem("totalItems", JSON.stringify(cartCount));
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
      toast.error("Could not add course in cart");
    }
  };
}

export function removeFromCart(courseId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "DELETE",
        REMOVE_FROM_CART_API(courseId)
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const cartCount = Number(response.data.cartCount) || 0;
      dispatch(setTotalItems(cartCount));
      localStorage.setItem("totalItems", JSON.stringify(cartCount));
    } catch (error) {
      console.error("REMOVE FROM CART ERROR:", error);
      toast.error("Could not remove course from cart");
    }
  };
}

export async function getCart() {
  try {
    const response = await apiConnector("GET", GET_ALL_CART_API);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.cart;
  } catch (error) {
    console.error("GET CART ERROR:", error);
  }
}

export function clearCart() {
  return async (dispatch) => {
    try {
      const response = await apiConnector("DELETE", CLEAR_CART_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(resetCart());

      dispatch(setTotalItems(0));
      localStorage.removeItem("totalItems");

    } catch (error) {
      console.error("CLEAR CART ERROR:", error);
      toast.error("Could not clear cart");
    }
  };
}