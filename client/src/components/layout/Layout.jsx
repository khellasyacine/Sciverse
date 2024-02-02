import SearchBar from "./SearchBar";
import { getTitleIcon } from "../../functions/layoutFct";
import { FilterProvider } from "../../contexts/FilterContext";
import ProfileButton from "../buttons/ProfileButton";
import SideMenu from "./SideMenu";
import BackToMenuBtn from "../buttons/BackToMenuBtn";

function Layout({ title, children, buttonComponent }) {
  const TitleIcon = getTitleIcon(title);

  return (
    <FilterProvider>
      <SideMenu title={title} />

      <div className="w-full flex flex-col justify-cetner items-center pt-5 gap-8">
        <div className="w-full px-5 flex justify-center items-center max-xl:justify-start ">
          <div className="w-fit rounded-full shadow-[0_0_25px_-7px_rgba(223,125,0,0.7)]">
            <SearchBar />
          </div>

          <ProfileButton />
        </div>

        <div className="w-full h-screen flex flex-col justify-start overflow-hidden">
          <div className="w-full bg-orange text-white flex flex-row justify-between p-4 items-center rounded-t-2xl max-lg:p-2">
            {title !== "Return Button" ? (
              <div className="flex justify-start items-center">
                <TitleIcon className="w-6 h-6 mx-2 max-lg:w-5" />
                <p className=" font-bold text-2xl font-poppins max-lg:text-xl">
                  {title}
                </p>
              </div>
            ) : (
              <BackToMenuBtn />
            )}

            {buttonComponent}
          </div>
          <div className="w-full flex-wrap overflow-y-scroll h-full">
            {children}
          </div>
        </div>
      </div>
    </FilterProvider>
  );
}

export default Layout;
