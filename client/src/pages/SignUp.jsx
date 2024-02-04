import AuthPagesBg from "../components/layout/AuthPagesBg";
import { logoOrangeBlack } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  optionsField,
  optionsNature,
  variantSignLgAbove,
  variantSignMaxLg,
  variantSignMaxSm,
} from "../constants";
import { UserContext } from "../contexts/UserContext";
import { routes } from "../routes/routes";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { logIn, isLoggedIn } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpenNature, setIsOpenNature] = useState(false);
  const [isOpenField, setIsOpenField] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    nature: "",
    field: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [variant, setVariant] = useState(() => {
    if (window.innerWidth < 640) {
      return variantSignMaxSm;
    } else if (window.innerWidth < 1024) {
      return variantSignMaxLg;
    } else {
      return variantSignLgAbove;
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleListNature = () => {
    setIsOpenNature(!isOpenNature);
  };

  const toggleListField = () => {
    setIsOpenField(!isOpenField);
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
        const response = await axios.post("http://127.0.0.1:5000/signup", data);
        if (response.data.error) {
          alert("Error: " + response.data.error);
        } else {
          const userProfile = { ...data, ...response.data };
          setFormSubmitted(true);
          await logIn(userProfile);
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

  useEffect(() => {
    if (formSubmitted && isLoggedIn) navigate(routes.HOME);
  }, [formSubmitted, isLoggedIn]);

  return (
    <div className="w-full h-[100vh] relative flex justify-center items-center ">
      <AuthPagesBg animationBgVariant={variant} />
      <div className="flex flex-row gap-10 w-2/3 h-[93vh] justify-center items-center padding-x bg-white rounded-3xl bg-opacity-90 shadow-[0_0_45px_-5px_rgba(223,125,0,0.7)] max-lg:w-10/12 max-lg:h-[85vh] max-lg:flex-col max-lg:py-8 max-lg:px-6 max-md:gap-6">
        <div className="flex w-4.5/12 justify-center items-center flex-col">
          <motion.img
            src={logoOrangeBlack}
            alt="logo"
            className="w-[300px]"
            exit={() => {
              if (variant == variantSignLgAbove)
                return { scale: 1.3, y: "-60%", x: "50%" };
              else return { y: "90%" };
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.h1
            className="text-xl font-bold font-poppins"
            exit={{ opacity: 0 }}
          >
            Welcome to lkasmdkn
          </motion.h1>
        </div>
        <motion.div
          className="w-full flex-1"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h1 className="font-poppins font-bold text-2xl mb-4 max-lg:text-xl">
            Personal information
          </h1>
          <form
            className="flex flex-col w-full justify-center items-center gap-4"
            onSubmit={handleSubmit}
          >
            {/* ********** full name input ********** */}
            <div className="flex flew-row justify-center items-center w-full gap-3">
              <div className="flex flex-1 flex-col">
                <label className="block mb-1 ml-2 text-sm font-poppins font-medium opacity-50">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  required
                  className="register-input"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <label className="block mb-1 ml-2 text-sm font-poppins font-medium opacity-50">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  required
                  className="register-input"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            {/* ************************************* */}

            {/* ********* Nature input ********** */}
            <div className="flex w-full flex-col">
              <label className="block mb-1 ml-2 text-sm font-poppins font-medium opacity-50">
                Profession:
              </label>
              <div className="flex flew-row justify-center items-center w-full gap-3">
                <div className="relative flex-1">
                  <div>
                    <select
                      name="nature"
                      id="nature"
                      onClick={toggleListNature}
                      value={data.nature}
                      onChange={handleChange}
                      required
                      className="register-input appearance-none signup-select"
                    >
                      <option value={""} key={null}>
                        You are a ...
                      </option>
                      {optionsNature.map((nature) => {
                        return (
                          <option value={nature.value} key={nature.label}>
                            {nature.label}
                          </option>
                        );
                      })}
                    </select>
                    {isOpenNature ? (
                      <FaAngleUp className="absolute top-3.5 right-0 mr-4 text-slate-500" />
                    ) : (
                      <FaAngleDown className="absolute top-3.5 right-0 mr-4 text-slate-500" />
                    )}
                  </div>
                </div>

                <div className="relative flex-1">
                  <div>
                    <select
                      name="field"
                      id="field"
                      required
                      value={data.field}
                      onClick={toggleListField}
                      onChange={handleChange}
                      className="register-input appearance-none signup-select"
                    >
                      <option value={""} key={null}>
                        Field
                      </option>
                      {optionsField.map((field) => {
                        return (
                          <option value={field.value} key={field.label}>
                            {field.label}
                          </option>
                        );
                      })}
                    </select>
                    {isOpenField ? (
                      <FaAngleUp className="absolute top-3.5 right-0 mr-4 text-slate-500" />
                    ) : (
                      <FaAngleDown className="absolute top-3.5 right-0 mr-4 text-slate-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* ************************************* */}

            {/* ************ email input ************ */}
            <div className="flex w-full flex-col">
              <label className="block mb-1 ml-2 text-sm font-poppins font-medium opacity-50">
                Email adress:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className="register-input"
                placeholder="Enter your email address"
              />
            </div>
            {/* ************************************* */}

            {/* *********** password input ********** */}
            <div className="flex w-full flex-col">
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
            <div className="flex w-full flex-col">
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
            <div className="w-full flex justify-center items-center gap-6">
              <Link to={routes.HEADER}>
                <button className="font-poppins font-medium text-lg px-12 max-lg:px-8 max-sm:px-6">
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="bg-orange text-white font-poppins font-medium text-md px-12 py-3.5 rounded-full max-lg:px-8 max-sm:px-6 max-lg:py-3"
              >
                Continue
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
