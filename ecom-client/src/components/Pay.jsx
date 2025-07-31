import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/payment-service";
const LAN_API_URL = "http://192.168.31.10:8000/payment-service";

const Pay = ({ cart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [duration, setDuration] = useState(null);

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  const handleCheckout = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    const startTime = Date.now();

    try {
      const response = await axios.post(LAN_API_URL, {
        cart,
      });
      const endTime = Date.now();
      setDuration(((endTime - startTime) / 1000).toFixed(2));
      setIsSuccess(true);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-emerald-50 flex flex-col items-center justify-center gap-4 py-8 rounded-xl">
      <div className="flex flex-col gap-12">
        <div>
          <div className="flex items-center gap-8">
            <h1 className="font-thin tracking-wider">CART TOTAL</h1>
            <h2 className="text-xl font-bold tracking-widest">₹{total}</h2>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Shipping & taxes calculated at checkout
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4"
            defaultChecked
          />
          <label htmlFor="terms">
            I agree to the{" "}
            <span className="text-emerald-300">Terms and Conditions</span>
          </label>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <span className="font-semibold text-sm">Saved Card:</span>
          <img src="/visa.png" alt="card" width={30} height={20} />
          <span className="font-semibold text-xs">**** 3567</span>
          <span className="text-xs text-emerald-300">(change)</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="bg-black px-5 py-3 text-white rounded-full flex items-center gap-4 w-max cursor-pointer hover:bg-gray-700 transition-all duration-300 disabled:cursor-not-allowed"
        >
          <span className="tracking-wider text-sm">
            {isLoading ? "Processing..." : "CHECKOUT"}
          </span>
          {isLoading ? (
            <span className="text-xs animate-pulse">⏳</span>
          ) : (
            <span>🛒</span>
          )}
        </button>

        {isSuccess && (
          <div className="text-green-500 text-sm flex items-center gap-2">
            <span>✅</span>
            <span>
              Successful in{" "}
              <span
                className={`font-bold ${
                  duration > 5 ? "text-red-500" : "text-green-500"
                }`}
              >
                {duration}
              </span>{" "}
              seconds
            </span>
          </div>
        )}

        {isError && <span className="text-red-500">Something went wrong!</span>}
      </div>
    </div>
  );
};

export default Pay;
