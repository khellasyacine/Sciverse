import AuthPagesBg from "../components/layout/AuthPagesBg";
import { googleIcn, logoOrangeBlack } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  variantHeaderLgAbove,
  variantHeaderMaxLg,
  variantHeaderMaxSm,
} from "../constants";
import { routes } from "../routes/routes";

const Header = () => {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(false);
  const [variant, setVariant] = useState(() => {
    if (window.innerWidth < 640) {
      return variantHeaderMaxSm;
    } else if (window.innerWidth < 1024) {
      return variantHeaderMaxLg;
    } else {
      return variantHeaderLgAbove;
    }
  });

  return (
    <div className="w-full h-[100vh] relative flex justify-center items-center">
      <AuthPagesBg animationBgVariant={variant} />
      <div className="flex flex-col gap-4 w-2/3 h-[90vh] items-center bg-white padding-x rounded-3xl bg-opacity-90 shadow-[0_0_45px_-5px_rgba(223,125,0,0.7)] max-lg:w-10/12 max-lg:h-[65vh] ">
        <motion.img
          src={logoOrangeBlack}
          alt="logo"
          className="w-[450px] py-12 max-lg:w-[300px] max-lg:py-10"
          exit={
            signIn
              ? () => {
                  if (variant == variantHeaderLgAbove)
                    return { scale: 0.7, y: -30 };
                }
              : () => {
                  if (variant == variantHeaderLgAbove)
                    return { scale: 0.7, y: "50%", x: "-50%" };
                  else return { y: "-50%" };
                }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <div className="flex flex-row w-full justify-center items-center gap-10 md:px-24 max-lg:flex-col max-lg:gap-4 max-md:px-0">
          <button
            className="bg-white text-orange font-poppins font-medium text-md px-[72px] py-[18px] rounded-[26px] shadow-lg max-lg:w-full"
            onClick={() => {
              setSignIn(true);
              navigate(routes.SIGNIN);
            }}
          >
            Sign in
          </button>
          <button
            className="bg-orange text-white font-poppins font-medium text-md px-[72px] py-[18px] rounded-[26px] shadow-lg max-lg:w-full"
            onClick={() => {
              setSignIn(false);
              navigate(routes.SIGNUP);
            }}
          >
            Sign up
          </button>
        </div>
        <Link to={routes.HEADER} className="max-lg:w-full lg:px-0 md:px-24">
          <div className="flex flex-row gap-2 lg:gap-4 justify-center items-center border-2 border-orange border-opacity-50 lg:px-[72px] py-2.5 rounded-[26px] cursor-pointer">
            <img
              src={googleIcn}
              alt=""
              width={35}
              className="max-md:w-[30px]"
            />
            <h1 className="text-black font-poppins font-medium text-md max-md:text-sm">
              Sign in with Google
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
