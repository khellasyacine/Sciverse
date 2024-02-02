import React from "react";
import { motion } from "framer-motion";

const AuthPagesBg = ({ animationBgVariant }) => {
  return (
    <motion.div className="w-full h-full absolute -z-10 inset-0">
      <motion.div
        className="w-[80%] h-[72vw] bg-orange opacity-[80%] absolute -top-[74%] -right-[7%] rounded-[50%] max-sm:-top-[40%] max-sm:-right-[143%] max-sm:w-[240%] max-sm:h-[260vw] max-lg:-top-[35%] max-lg:-right-[80%] max-lg:w-[160%] max-lg:h-[130vw] "
        variants={animationBgVariant}
        initial="initialEllipse1"
        exit="exitEllipse1"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="w-[40%] h-[40vw] bg-orange opacity-[80%] absolute -bottom-[33%] -left-[5%] rounded-full max-sm:-bottom-[30%] max-sm:-left-[55%] max-sm:w-[120%] max-sm:h-[120vw] max-lg:-bottom-[40%] max-lg:-left-[50%] max-lg:w-[100%] max-lg:h-[100vw]"
        variants={animationBgVariant}
        initial="initialEllipse2"
        exit="exitEllipse2"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      ></motion.div>
    </motion.div>
  );
};

export default AuthPagesBg;
