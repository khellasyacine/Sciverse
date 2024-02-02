import { createContext, useState } from "react";
import { articleInitialization } from "../constants";

const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
  const [ArticleDisplay, setArticleDisplay] = useState(null);

  return (
    <ArticleContext.Provider value={{ArticleDisplay, setArticleDisplay}}>
      {children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
