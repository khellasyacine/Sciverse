import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

const EditArticleBtn = () => {
  const Navigate = useNavigate();

  return (
    <div>
        <button onClick={()=> {Navigate(routes.EDITARTICLE)}} className="w-fit px-3 py-2 bg-white text-black rounded-xl max-md:py-1 max-md:px-2">
          Corriger l'article
        </button>
    </div>
  );
};

export default EditArticleBtn;
