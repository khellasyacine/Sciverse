import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { routes } from "../../routes/routes";
import { CgProfile } from "react-icons/cg";


const ProfileButton = () => {
  const { logOut } = useContext(UserContext);
  const [profileToggle, setProfileToggle] = useState(false);

  return (
    <div className="fixed right-4 max-lg:right-2">
      <div
        className="flex flex-row justify-center items-center gap-2 p-1.5 rounded-full cursor-pointer shadow-[0_0_25px_-7px_rgba(223,125,0,0.7)] hover:text-orange"
        onClick={() => setProfileToggle(!profileToggle)}
      >
        <div className="w-[30px] h-[30px] justify-center items-center">
          <CgProfile className="w-full h-full rounded-full object-center object-cover" />
        </div>
        <p className="font-medium font-poppins max-lg:hidden">
          Profile
        </p>
        <IoIosArrowDown
          className={`max-sm:hidden ${profileToggle ? "rotate-180" : ""}`}
        />
      </div>
      {profileToggle && (
        <div className="absolute right-0 mt-0.5 top-[100%] flex flex-col px-3 py-2 w-full gap-1 rounded-xl bg-white shadow-xl max-lg:w-fit ">
          <Link
            to={routes.SETTINGS}
            className="flex flex-row gap-1 items-center font-poppins font-medium hover:text-orange"
          >
            <IoSettings />
            Settings
          </Link>
          <div className="w-full h-[1px] bg-grey" />
          <Link
            to={routes.HEADER}
            className="flex flex-row gap-1 items-center font-poppins font-medium hover:text-orange"
            onClick={() => {
              logOut();
            }}
          >
            <FaSignOutAlt className="rotate-180" />
            Log out
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
