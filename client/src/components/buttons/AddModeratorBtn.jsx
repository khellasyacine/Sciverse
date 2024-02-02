import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

const AddModeratorBtn = () => {
  const Navigate = useNavigate();

  return (
    <div>
        <button onClick={()=> {Navigate(routes.ADDMODERATOR)}} className="w-fit px-3 py-2 bg-white text-black rounded-xl max-md:py-1 max-md:px-2">
          Ajouter Moderateur
        </button>
    </div>
  );
};

export default AddModeratorBtn;
