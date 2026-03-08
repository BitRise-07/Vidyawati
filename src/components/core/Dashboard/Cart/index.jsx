import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmmount from "./RenderTotalAmmount";
import { getCart } from "../../../../services/operations/cartApi";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../../common/Spinner";
import { calculateCartTotal } from "../../../../utils/calculateTotal";
import { setTotal } from "../../../../slices/cartSlice";
import { clearCart } from "../../../../services/operations/cartApi";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const cart = await getCart();
        
        const safeCart = cart || [];
        setCartItems(safeCart);

        dispatch(setTotal(calculateCartTotal(safeCart)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [dispatch]);

  return (
    <div className="animate-fade-in-up ">
      {loading ? (
        <Spinner />
      ) : cartItems.length === 0 ? (
        <div className="text-center  py-20">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-full flex items-center justify-center">
            <FaShoppingCart className="text-6xl text-orange-400" />
          </div>
          <h3 className="text-2xl font-bold text-vd-secondary mb-3">
            Your cart is empty
          </h3>
          <p className="text-vd-txt mb-8 max-w-md mx-auto">
            Looks like you haven't added any courses to your cart yet. Start
            exploring our catalog!
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
          >
            <FaShoppingCart />
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-vd-secondary">
                Your Courses ({cartItems.length})
              </h2>
              <button
                onClick={() => {
                  dispatch(clearCart());
                  setCartItems([]);
                }}
                className="text-sm text-red-500 hover:text-vd-secondary cursor-pointer font-medium transition-colors duration-300 pr-15"
              >
                Clear All
              </button>
            </div>
            <RenderCartCourse
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <RenderTotalAmmount
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
