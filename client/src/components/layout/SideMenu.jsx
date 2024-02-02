import React, { useContext, useState } from 'react'
import { logoOrangeBlack, logoSOrange } from '../../assets/icons';
import { navLinks } from '../../constants';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { MdGroups } from 'react-icons/md';
import { UserContext } from '../../contexts/UserContext';

const SideMenu = ({title}) => {
      const { userProfile } = useContext(UserContext);
      const { role } = userProfile;
      //Getting page title and icon
      const [selectedItem, setSelectedItem] = useState(title);
  return (
    <div
      className={
        "h-screen w-2/12 sm:w-2/12 md:w-1/4 xl:w-[250px] sm:flex flex-col text-black "
      }
    >
      <div className="side-bar w-full h-full flex flex-col gap-10 items-center">
        <img src={logoOrangeBlack} className=" w-2/3 py-4 max-md:hidden" />
        <img src={logoSOrange} className=" w-7/12 py-4 md:hidden" />
        <div className="flex flex-col h-1/2 items-center justify-start gap-10 2xl:gap-y-16 ">
          {navLinks.map((link,index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                className={`menu-text ${
                  selectedItem === link.label ? "text-orange font-bold" : ""
                }`}
                to={link.href}
              >
                <Icon className="w-[22px] h-[22px]" />
                <p className="max-md:hidden">{link.label}</p>
              </Link>
            );
          })}

          {role === "admin" ? (
            <Link
              className={`menu-text ${
                selectedItem === "Moderators" ? "text-orange font-bold" : ""
              }`}
              to={routes.MODERATORS}
            >
              <MdGroups className="w-[24px] h-[24px]" />
              <p className="max-md:hidden">Moderators</p>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SideMenu