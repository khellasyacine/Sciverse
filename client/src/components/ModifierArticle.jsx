import { length, split, useContext, useEffect, useState } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

function ArticleDetails() {
  const navigate = useNavigate();
  const { ArticleDisplay, setArticleDisplay } = useContext(ArticleContext);
  const { userProfile } = useContext(UserContext);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAddRow = (inputValue) => {
    const delimiters = [",", ";", "|", "/", "."];
    const elements = inputValue
      .split(new RegExp(`[${delimiters.join("")}]`))
      .map((element) => element.trim());

    const filteredElements = elements.filter((element) => element !== "");

    return filteredElements;
  };

  const joinArrayDelimiter = (arr) => arr.join(", ");

  const keywordsValues = ArticleDisplay.keywords.map(
    (keywordObject) => keywordObject.keyword
  );

  const referencesValues = ArticleDisplay.references.map(
    (referenceObject) => referenceObject.reference
  );

  const [keywordsInput, setKeyWordsInput] = useState(
    joinArrayDelimiter(keywordsValues)
  );

  const [referencesInput, setReferencesInput] = useState(
    joinArrayDelimiter(referencesValues)
  );

  const [data, setData] = useState(ArticleDisplay);

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleKeywordsChange = (event) => {
    setKeyWordsInput(event.target.value);
  };

  const handleReferencesChange = (event) => {
    setReferencesInput(event.target.value);
  };

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/article/get/${ArticleDisplay.id}`,
          {
            headers: {
              Authorization: `Bearer ${userProfile.access_token}`,
            },
          }
        );
        setArticleDisplay({
          id: ArticleDisplay.id,
          ...response.data.article,
        });
        setFormSubmitted(false);
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
    if (formSubmitted) fetchArticleData();
  }, [formSubmitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const keywords = await handleAddRow(keywordsInput);
      const references = await handleAddRow(referencesInput);

      setData({
        ...data,
        keywords: keywords,
        references: references,
      });
      const response = await axios.put(
        `http://127.0.0.1:5000/article/edit/${ArticleDisplay.id}`,
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
        alert("article updated succefully");
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

  const handleAnnuler = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className="w-full h-full relative">
      <div className="W-5/6 py-6 px-6 flex flex-col flex-wrap justify-center content-center bg-[#DEDEDE] font-poppins">
        <form
          autoComplete="off"
          action="post"
          className="w-full flex flex-col flex-wrap justify-center content-center"
        >
          <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">
            Title:
          </p>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="py-2.5 px-5 w-5/6 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-wrap flex-wrap flex "
          />
          <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">
            Abstract:
          </p>
          <textarea
            rows={7}
            value={data.abstract}
            name="abstract"
            onChange={handleChange}
            className="py-2.5 px-5 w-5/6 rounded-[20px] bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-justify"
          />
          <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">
            Full text:
          </p>
          <textarea
            rows={15}
            value={data.full_text}
            name="full_text"
            onChange={handleChange}
            className="py-2.5 px-5 w-5/6 rounded-[20px] bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-justify"
          />
          <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">
            Keywords:{" "}
            <label className="font-poppins text-xs pl-1 text-red-500 my-1">
              Use ',' as delimiter between keywords
            </label>
          </p>
          <input
            type="text"
            name="keywords"
            value={keywordsInput}
            onChange={handleKeywordsChange}
            className="py-2.5 px-5 w-5/6 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-wrap flex-wrap flex "
          />
          <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">
            References:{" "}
            <label className="font-poppins text-xs pl-1 text-red-500 my-1">
              Use ',' as delimiter between references
            </label>
          </p>
          <input
            type="text"
            name="references"
            value={referencesInput}
            onChange={handleReferencesChange}
            className="py-2.5 px-5 w-5/6 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-wrap flex-wrap flex "
          />
          <div className="flex justify-evenly my-4 w-1/2 mx-auto">
            <button
              onClick={handleAnnuler}
              className="lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleDetails;
