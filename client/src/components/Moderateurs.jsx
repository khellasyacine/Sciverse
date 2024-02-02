import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Pop from "./popUps/PopDeleteModer.jsx";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes.js";
import axios from "axios";
import { UserContext } from "../contexts/UserContext.jsx";

function Moderateurs() {
  const [Display, SetDisplay] = useState(false);
  const Popup = () => {
    SetDisplay(true);
  };
  const Close = () => {
    SetDisplay(false);
  };

  const navigate = useNavigate();
  const [moderators, setModerators] = useState([]);
  const { userProfile } = useContext(UserContext);
  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/moderators", {
          headers: {
            Authorization: `Bearer ${userProfile.access_token}`,
          },
        });
        setModerators(response.data.moderators);
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
    };

    fetchModerators();
  }, []);

  return (
    <div className="w-full h-full relative ">
      {Display && <Pop Close={Close} Delete={FilterData()} />}
      <div className="w-full py-2 px-6 flex flex-col flex-wrap justify-center content-center bg-[#ffffff] bg-opacity-80 font-poppins">
        <div className="w-full flex justify-between content-center flex-nowrap my-1 mx-4 ">
          <div className="flex justify-between content-center flex-nowrap mx-4 w-[64%] px-4 ">
            <p className="h-6">nom</p>
            <p className="h-6 ml-8">prenom</p>
            <p className="h-6 mr-16">email</p>
          </div>
        </div>
      </div>
      {moderators.map((list,index) => {
        return (
          <div
            key={index}
            className="w-full py-4 px-6 flex flex-col flex-wrap justify-center content-center bg-[#DEDEDE] font-poppins"
          >
            <div className="flex justify-between content-center flex-nowrap my-1 mx-4">
              <div className="flex justify-between content-center flex-nowrap mx-4 w-4/6">
                <p className="h-6">{list.firstName}</p>
                <p className="h-6">{list.lastName}</p>
                <p className="h-6">{list.email}</p>
              </div>
              <div className="flex justify-between content-center flex-nowrap ml-4 w-16">
                <button
                  onClick={() => {
                    navigate(routes.MODERATOREDIT);
                  }}
                >
                  <MdModeEditOutline className="w-5 h-5" />
                </button>
                <button onClick={Popup}>
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
            <hr className="bg-[#E87D00] h-1 sm:h-0.5 w-full rounded-full border-none sm:mb-0 mb-4" />
          </div>
        );
      })}
    </div>
  );
}

export default Moderateurs;
