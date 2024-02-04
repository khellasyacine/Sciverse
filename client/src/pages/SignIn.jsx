import AuthPagesBg from "../components/layout/AuthPagesBg";
import { logoOrangeBlack } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../contexts/UserContext";
import {
  variantSignLgAbove,
  variantSignMaxLg,
  variantSignMaxSm,
} from "../constants";
import { routes } from "../routes/routes";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const { logIn, isLoggedIn } = useContext(UserContext);

  //const replaceAction = replaceStackWithRoute('/layout');

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/signin", data);
      if (response.data.error) {
        alert("Error: " + response.data.error);
      } else {
        const userProfile = {
          ...data,
          ...response.data.user,
          access_token: response.data.access_token,
        };
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
        alert("No response received from the server. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(routes.HOME);
    }
  }, [isLoggedIn, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const [variant, setVariant] = useState(() => {
    if (window.innerWidth < 640) {
      return variantSignMaxSm;
    } else if (window.innerWidth < 1024) {
      return variantSignMaxLg;
    } else {
      return variantSignLgAbove;
    }
  });

  return (
    <div className="w-full h-[100vh] relative flex justify-center items-center ">
      <AuthPagesBg animationBgVariant={variant} />
      <div className="flex flex-col gap-6 w-2/3 h-[90vh] items-center bg-white padding-x rounded-3xl bg-opacity-90 shadow-[0_0_45px_-5px_rgba(223,125,0,0.7)] max-lg:w-10/12 max-lg:h-[65vh]">
        <div className="w-full flex justify-center items-center flex-col">
          <motion.img
            src={logoOrangeBlack}
            alt="logo"
            className="w-[300px] pt-10"
            exit={() => {
              if (variant == variantSignLgAbove) return { scale: 1.5, y: 30 };
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.h1
            className="text-xl font-bold font-poppins max-sm:text-lg"
            exit={() => {
              if (variant == variantSignLgAbove) return { opacity: 0 };
            }}
          >
            Welcome to lkasmdkn
          </motion.h1>
        </div>
        <motion.section
          className="w-full flex flex-col gap-4"
          exit={() => {
            if (variant == variantSignLgAbove) return { opacity: 0 };
          }}
        >
          <form className="flex flex-col w-full justify-center items-center gap-6 padding-x max-lg:px-0">
            <div className="flex w-9/12 flex-col max-md:w-full">
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

            <div className="flex w-9/12 flex-col max-md:w-full">
              <label className="block mb-1 ml-2 text-sm font-poppins font-medium opacity-50">
                Password:
              </label>
              <div className="relative flex w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={data.password}
                  name="password"
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
          </form>
          <div className="w-full flex justify-center items-center gap-6 py-3">
            <Link to={routes.HEADER}>
              <button className="font-poppins font-medium text-lg px-12 max-lg:px-8 max-sm:px-6">
                Cancel
              </button>
            </Link>
            <button
              className="bg-orange text-white font-poppins font-medium text-md px-12 py-3.5 rounded-full max-lg:px-8 max-sm:px-6 max-lg:py-3"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SignIn;
