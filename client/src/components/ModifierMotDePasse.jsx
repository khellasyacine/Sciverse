import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

function ModifierMotDePasse() {
  const navigate = useNavigate();
  const { userProfile } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [data, setData] = useState({ password: "", confirmPassword: "" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword)
      alert("Passwords do not match. Please re-enter your password.");
    else {
      try {
        const response = await axios.put(
          `http://127.0.0.1:5000/user/update/${userProfile.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${userProfile.access_token}`,
            },
          }
        );
        if (response.data.error) {
          alert("Error: " + response.data.error);
        } else {
          setFormSubmitted(true);
          alert("password updated succefully");
        }
      } catch (error) {
        console.error("Error:", error);

        // Check if there is a response in the error object
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);

          // Handle specific HTTP status codes if needed
          if (error.response.status === 401) {
            alert("Unauthorized: Please check your credentials.");
          } else {
            alert("An error occurred. Please try again later.");
          }
        } else if (error.request) {
          console.error("No response received. Request:", error.request);
          alert(
            "No response received from the server. Please try again later."
          );
        } else {
          console.error("Error message:", error.message);
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  const handleAnnuler = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className="w-full relative h-full">
      <div className="w-full py-4 px-6 flex flex-col flex-wrap justify-center content-center bg-[#dedede] font-poppins">
        <form
          autoComplete="off"
          action="post"
          className="w-full flex flex-col flex-wrap justify-center content-center items-center gap-5"
        >
          {/* *********** password input ********** */}
          <div className="flex w-1/2 flex-col max-md:w-full justify-center">
            <label className="block mb-1 ml-2 text-sm font-poppins font-medium opacity-50">
              Password:
            </label>
            <div className="relative flex w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="register-input"
              />
              <div
                onClick={togglePasswordVisibility}
                className={`absolute inset-y-0 right-0 flex items-center mr-4 text-gray-500 cursor-pointer`}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          {/* ************************************* */}

          {/* ******* confirm password input ****** */}
          <div className="flex w-1/2 flex-col max-md:w-full justify-center">
            <label className="block mb-1 ml-2 text-sm font-poppins font-medium opacity-50">
              Confirm Password:
            </label>
            <div className="relative flex w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="register-input"
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className={`absolute inset-y-0 right-0 flex items-center mr-4 text-gray-500 cursor-pointer`}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          {/* ************************************* */}
          <div className="flex w-1/3 justify-between mb-4 sm:mt-0 mt-4 max-md:w-1/2">
            <button
              onClick={handleAnnuler}
              className="lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModifierMotDePasse;
