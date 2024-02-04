import { getAuteurInstitus } from "../../functions/articleFct";
import React, { useContext, useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { routes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { ArticleContext } from "../../contexts/ArticleContext";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function ArticleCard({ article }) {
  const { setArticleDisplay } = useContext(ArticleContext);
  const { userProfile } = useContext(UserContext);
  const [favorite, setFavorite] = useState(article.is_favorite);
  const Navigate = useNavigate();
  const handleFavorite = async () => {
    if (!favorite) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/favorites/add/${article.id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${userProfile.access_token}`,
            },
          }
        );
        setFavorite((prevFavorite) => !prevFavorite);
      } catch (error) {
         if (error.response) {
           if (error.response.status === 401) {
             alert("Unauthorized: Please check your credentials.");
           } else {
             alert("Error: " + error.response.data.error);
           }
         } else if (error.request) {
           alert(
             "No response received from the server. Please try again later."
           );
         } else {
           alert("An unexpected error occurred. Please try again later.");
         }
      }
    } else {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:5000/favorites/remove/${article.id}`,
          {
            headers: {
              Authorization: `Bearer ${userProfile.access_token}`,
            },
          }
        );
        setFavorite((prevFavorite) => !prevFavorite);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            alert("Unauthorized: Please check your credentials.");
          } else {
            alert("Error: " + error.response.data.error);
          }
        } else if (error.request) {
          alert(
            "No response received from the server. Please try again later."
          );
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-start font-poppins bg-grey">
      <div className="relative h-full w-[97.5%] bg-white mx-4 mb-4 rounded-3xl py-3 lg:px-7 px-3 flex justify-center flex-col max-md:mx-2 max-md:mb-2.5 2xl:w-[98.25%]">
        <div
          onClick={handleFavorite}
          className={`absolute top-4 right-4 flex items-center cursor-pointer ${
            favorite ? "text-orange" : "text-gray-500"
          }`}
        >
          <IoStar className="w-5 h-5" />
        </div>

        <p className="text-xl font-medium max-md:text-lg">{article.title}</p>
        <p className="text-xs mb-2.5 text-justify max-sm:max-w-[350px] max-md:max-w-md">
          {article.authors?.map((author, index) => (
            <React.Fragment key={index}>
              {getAuteurInstitus(author)}
              {index !== article.authors.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        <p className="lg:text-[16px] max-h-20 overflow-hidden text-sm line-clamp-3 text-justify max-sm:max-w-xs max-sm:line-clamp-4 max-md:max-w-md">
          Resumé : {article.abstract}{" "}
        </p>
        <div className="lg:h-1/4 sm:h-1/5 mt-2 w-full flex justify-between items-center max-sm:justify-end">
          <div className="flex sm:w-[60.5%] w-1/3 overflow-hidden flex-row shrink-0 h-full max-sm:hidden py-2 items-center">
            {article.keywords?.map((mot, index) => {
              return (
                <div
                  key={index}
                  className="bg-grey lg:py-2 py-1 lg:px-5 px-3 rounded-full text-xs mr-1.5 shrink-0 flex items-center"
                >
                  {mot}
                </div>
              );
            })}
          </div>
          <div className=" flex flex-row shrink-0 items-center">
            <button className=" hover:opacity-80 hover:transition-all hover:duration-150 hover:ease-in font-semibold bg-white py-2.5 lg:px-5 px-3 rounded-xl border-2 border-black lg:text-sm text-xs mx-1 shrink-0">
              Download
            </button>
            <button
              onClick={() => {
                setArticleDisplay(article);
                Navigate(routes.ARTICLE);
              }}
              className="hover:opacity-80 hover:transition-all hover:duration-150 hover:ease-in font-semibold bg-[#E87D00] text-white py-3 lg:px-7 px-6 rounded-xl lg:text-sm text-xs mx-1 shrink-0"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
