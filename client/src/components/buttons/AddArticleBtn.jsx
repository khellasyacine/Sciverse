import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

const AddArticleBtn = () => {
  const [toggleUrl, setToggleUrl] = useState(false);
  const [data, setData] = useState({ pdf_url: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { userProfile } = useContext(UserContext);
  const handleToggleUrl = () => {
    setToggleUrl(!toggleUrl);
  };

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/article/add",
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
    if (formSubmitted) alert("article added succesfully");
  }, [formSubmitted]);

  return (
    <div>
      {!toggleUrl && (
        <button
          className="w-fit px-3 py-2 bg-white text-black rounded-xl max-md:py-1 max-md:px-2"
          onClick={handleToggleUrl}
        >
          Add Article
        </button>
      )}
      {toggleUrl && (
        <form
          className="bg-grey rounded-xl pl-2.5 font-poppins max-md:text-sm"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            name="pdf_url"
            className="w-[400px] bg-grey focus:outline-none font-poppins text-black text-md max-lg:w-[250px] max-md:w-[290px] max-sm:w-[160px]"
            required
            value={data.pdf_url}
            onChange={handleChange}
            placeholder="Enter your pdf url"
          />
          <button
            className="px-4 py-2 bg-white text-black rounded-r-xl max-md:px-2.5 max-md:py-1.5"
            type="submit"
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default AddArticleBtn;