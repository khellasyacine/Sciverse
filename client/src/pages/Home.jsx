import { useState, useEffect, useContext } from "react";
import ArticleCard from "../components/cards/ArticleCard";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { FilterContext } from "../contexts/FilterContext";
import { getSearchOptions } from "../functions/articleFct";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const { userProfile } = useContext(UserContext);
  const { filter } = useContext(FilterContext);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/search-article",
          getSearchOptions(filter) ,
          {
            headers: {
              Authorization: `Bearer ${userProfile.access_token}`,
            },
          }
        );
        setArticles(response.data.articles);
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

    fetchArticles();
  }, [filter]);

  return (
    <div className="w-full h-full flex justify-start items-start flex-col bg-grey pt-4 max-md:pt-2">
      {articles.length === 0 ? (
        <div className="flex w-full justify-center">
          <p className="flex font-poppins font-semibold text-2xl items-center">
            No articles found
          </p>
        </div>
      ) : (
        articles.map((article, index) => (
          <ArticleCard article={article} key={index} />
        ))
      )}
    </div>
  );
};

export default Home;
