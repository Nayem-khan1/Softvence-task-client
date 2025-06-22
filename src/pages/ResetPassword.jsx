import React, { useState } from "react";
import { resetLogo } from "../assets/assets";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };


  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`,
        {
          email: formData.email,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      if (response.data?.message === "Password reset successful") {
        setFormData({ email: "", newPassword: "", confirmPassword: "" });
        navigate("/signin");
      } else {
        alert(response.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(
        error.response?.data?.message || "Server error. Please try again later."
      );
    }
  };

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
          <form className="space-y-6" onSubmit={resetPasswordHandler}>
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
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword.newPassword ? "text" : "password"}
                  required
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword.newPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-dark transition duration-150"
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
