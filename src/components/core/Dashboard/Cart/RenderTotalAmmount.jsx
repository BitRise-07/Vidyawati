import React, { useEffect, useState } from "react";
import { FaLock, FaShieldAlt, FaTag, FaGift, FaCreditCard } from "react-icons/fa";
import { useSelector } from "react-redux";

const RenderTotalAmmount = ({ cartItems }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // 🔥 Rename redux total to avoid conflict
  const { total: cartSubtotal } = useSelector((state) => state.cart);

  const subtotal = Number(cartSubtotal) || 0;
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax - discount;

  // 🔥 Recalculate discount when subtotal changes
  useEffect(() => {
    if (couponCode.toUpperCase() === "VIDYA10") {
      setDiscount(subtotal * 0.1);
    }
  }, [subtotal, couponCode]);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "VIDYA10") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-6 mt-14">
      {/* Main Card */}
      <div className="bg-white rounded-xl border border-orange-100 shadow-sm">
        {/* Header */}
        <div className="px-6 py-5 border-b border-orange-100">
          <h2 className="text-lg font-semibold text-vd-secondary">
            Order Summary
          </h2>
          <p className="text-sm text-vd-muted mt-1">
            Review your purchase details
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-vd-secondary">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-vd-muted">
              <span>GST (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="border-t border-orange-100 pt-5">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-vd-muted">Total Amount</p>
                <p className="text-xs text-vd-muted">Inclusive of all taxes</p>
              </div>
              <p className="text-2xl font-bold text-vd-secondary">
                ₹{grandTotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Coupon */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-vd-secondary">
              <FaTag className="text-orange-500" />
              Apply Coupon
            </div>

            <div className="flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-1.5 py-1.5 text-sm border border-orange-200 rounded-lg focus:ring-1 focus:ring-orange-400 outline-none"
              />
              <button
                onClick={applyCoupon}
                className="px-3 py-1.5 bg-vd-secondary text-white text-sm font-semibold rounded-lg hover:bg-vd-primary cursor-pointer transition"
              >
                Apply
              </button>
            </div>

            {discount > 0 && (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <FaGift />
                You saved ₹{discount.toFixed(2)}
              </p>
            )}
          </div>

          {/* Checkout */}
          <button
            disabled={!cartItems.length}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition
              ${
                cartItems.length === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#F9872C] to-orange-500 cursor-pointer text-white hover:bg-vd-secondary"
              }
            `}
          >
            <FaLock />
            {cartItems.length ? "Proceed to Checkout" : "Cart is Empty"}
          </button>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
          <FaShieldAlt />
          Secure Payment
        </div>
        <p className="text-xs text-green-700">
          100% secure checkout · No card data stored
        </p>
        <div className="flex items-center gap-3 text-xs text-green-700">
          <FaCreditCard />
          Cards · UPI · NetBanking
        </div>
      </div>
    </div>
  );
};

export default RenderTotalAmmount;
