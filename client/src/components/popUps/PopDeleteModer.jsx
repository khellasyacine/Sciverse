import { FaExclamationTriangle } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function PopDeleteModer({ Close, moderator_id }) {
  const { userProfile } = useContext(UserContext);
  const [deleteCompleted, setDeleteCompleted] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/user/delete/${moderator_id}`,
        {
          headers: {
            Authorization: `Bearer ${userProfile.access_token}`,
          },
        }
      );
      alert("account deleted succefully");
      setDeleteCompleted(true);
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
    if (deleteCompleted) {
      Close();
    }
  }, [deleteCompleted]);

  return (
    <div className="h-full w-full bg-black bg-opacity-30 absolute">
      <div className="lg:h-[250px] h-[210px] w-[450px] bg-white border-none py-2 rounded-[20px] flex flex-col justify-evenly content-center flex-wrap relative top-1/4 left-1/3">
        <div className="flex justify-center lg:h-16 h-12">
          <FaExclamationTriangle className="h-16 w-16" />
        </div>
        <div className="flex justify-center">
          <p className="lg:text-lg font-poppins font-medium lg:w-96 w-80 lg:px-0 px-2 text-center">
            Etes-vous sur de vouloir vouloir supprimer definitivement ce compte
            ?
          </p>
        </div>
        <div className="flex justify-between mt-1 px-6">
          <button
            onClick={Close}
            className="lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            className="lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]"
          >
            Oui, Continuer
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopDeleteModer;
