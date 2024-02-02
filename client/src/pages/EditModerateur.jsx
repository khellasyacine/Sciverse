import { useParams } from "react-router-dom";
import ModerateurEdit from "../components/ModifierModerateur.jsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";

const EditModerateur = () => {
  const { moderator_id } = useParams();
  const { userProfile } = useContext(UserContext);
  const [moderator, setModerator] = useState({
    id:moderator_id,
    firstName: "",
    lastName: "",
    nature: "",
    field: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  

  return (
    <div className="w-full h-full flex justify-start items-start flex-col bg-grey max-md:pt-2">
      <ModerateurEdit moderator_id={moderator_id} />
    </div>
  );
};

export default EditModerateur;
