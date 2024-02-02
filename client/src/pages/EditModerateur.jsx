import { useParams } from "react-router-dom";
import ModerateurEdit from "../components/ModifierModerateur.jsx";

const EditModerateur = () => {
  const { moderator_id } = useParams();  

  return (
    <div className="w-full h-full flex justify-start items-start flex-col bg-grey max-md:pt-2">
      <ModerateurEdit moderator_id={moderator_id} />
    </div>
  );
};

export default EditModerateur;
