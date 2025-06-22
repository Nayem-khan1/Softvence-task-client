import React from "react";
import { resetLogo } from "../assets/assets";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Banner */}
      <div
        style={{
          backgroundImage: "url(/header1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "180px",
        }}
      ></div>

      {/* Form Container */}
      <div className="h-screen -mt-16 container mx-auto bg-white shadow-lg rounded-2xl px-8 py-10">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={resetLogo} alt="Reset Logo" className="h-10 w-auto" />
            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Reset Your Password
            </h2>
            <p className="mt-1 text-sm text-gray-500 text-center">
              Use a strong password with numbers, letters, and symbols.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-lg bg-primary px-4 py-2 font-semibold hover:bg-primary-dark transition duration-150"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
