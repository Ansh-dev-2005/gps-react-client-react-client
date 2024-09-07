import React, { useState } from "react";
import Base from "../Components/Base/Base";
import { ArrowPathIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { signUp } from "../Helpers";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formsumbitregister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        setLoading(false);
        return;
      }

      const registerResponse = await signUp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        emailAddress: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
      });


      console.log("Registration response:", registerResponse);
      alert(registerResponse.message || "Registration successful!");

      if (registerResponse.success) {
        localStorage.setItem("refreshToken", registerResponse.refreshToken);
        navigate("/login");
        
        // Or store user data in context
      }

    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Base style="bg-gray-100 rounded-t-2xl">
      <div className="w-full overflow-y-scroll max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Sign Up</h1>
        <div className="overflow-y-scroll h-screen">
          <form className="space-y-6" onSubmit={formsumbitregister}>
            {/* Email */}
            <div className="flex flex-col">
              <label
                className="text-md font-semibold text-gray-600 mb-1"
                htmlFor="email"
              >
                Email:
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <EnvelopeIcon className="h-6 w-6 text-gray-500 ml-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-none outline-none rounded-md"
                  required
                />
              </div>
            </div>

            {/* First Name */}
            <div className="flex flex-col">
              <label
                className="text-md font-semibold text-gray-600 mb-1"
                htmlFor="firstName"
              >
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label
                className="text-md font-semibold text-gray-600 mb-1"
                htmlFor="lastName"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <label
                className="text-md font-semibold text-gray-600 mb-1"
                htmlFor="mobileNumber"
              >
                Mobile Number:
              </label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* Username */}
            <div className="flex flex-col">
              <label
                className="text-md font-semibold text-gray-600 mb-1"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                className="text-md font-semibold text-gray-600 mb-1"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label
                className="text-md font-semibold text-gray-600 mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="p-1 pt-2 flex flex-col">
              <button
                disabled={loading}
                type="submit"
                className="bg-black w-[120px] h-[40px] flex flex-row justify-center p-1 rounded-lg text-white text-lg font-semibold"
              >
                Register
                {loading && (
                  <ArrowPathIcon
                    className="ml-2 mt-1 animate-spin"
                    width={25}
                    height={25}
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default Signup;
