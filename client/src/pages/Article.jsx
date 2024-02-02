import { useState, useEffect } from "react";
import ArticleDetails from "../components/ArticleDeatails";

const Article = () => {
  // useEffect(() => {
  //   const fetchArticle = async () => {
      

  //     //   try {
  //     //     const response = await fetch();
  //     //     if (!response.ok) {
  //     //       throw new Error("Failed to fetch data");
  //     //     }
  //     //     const data = await response.json();
  //     //     setArticles(data);
  //     //   } catch (error) {
  //     //     console.error("Error fetching data:", error);
  //     //   }
  //   };

  //   fetchArticle();
  // }, []);

  return (
    <div className="w-full h-full flex justify-start items-start flex-col bg-grey pt-4 max-md:pt-2">
        <ArticleDetails />
    </div>
  );
};

export default Article;