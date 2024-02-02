import { useState, useEffect, useContext } from "react";
import ArticleCard from "../components/cards/ArticleCard";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const Favorite = () => {
  const [articles, setArticles] = useState([]);
  const { userProfile } = useContext(UserContext);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/favorite_articles/get",
          {
            headers: {
              Authorization: `Bearer ${userProfile.access_token}`,
            },
          }
        );
        setArticles(response.data.favorite_articles);
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
    };

    fetchArticles();
  }, []);

  return (
    <div className="w-full h-full flex justify-start items-start flex-col bg-grey pt-4 max-md:pt-2">
      {articles.map((article, index) => (
        <ArticleCard article={article} key={index} />
      ))}
    </div>
  );
};

export default Favorite;
