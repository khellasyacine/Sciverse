import React, { useState } from "react";

const AddArticleBtn = () => {
  const [toggleUrl, setToggleUrl] = useState(false);
  const [articleUrl, setArticleUrl] = useState("");

  const handleChange = (e) => {
    setArticleUrl(e.target.value);
  };

  const handleToggleUrl = () => {
    setToggleUrl(!toggleUrl);
  };

  const handleAddArticle = () => {};

  return (
    <div>
      {!toggleUrl && (
        <button className="w-fit px-3 py-2 bg-white text-black rounded-xl max-md:py-1 max-md:px-2" onClick={handleToggleUrl}>
          Add Article
        </button>
      )}
      {toggleUrl && (
        <div className="bg-grey rounded-xl pl-2.5 font-poppins max-md:text-sm">
          <input
            type="url"
            className="w-[400px] bg-grey focus:outline-none font-poppins text-black text-md max-lg:w-[250px] max-md:w-[290px] max-sm:w-[160px]"
            required
            value={articleUrl}
            onChange={handleChange}
            placeholder="Url"
          />
          <button className="px-4 py-2 bg-white text-black rounded-r-xl max-md:px-2.5 max-md:py-1.5" onclick={handleAddArticle} >Add</button>
        </div>
      )}
    </div>
  );
};

export default AddArticleBtn;
