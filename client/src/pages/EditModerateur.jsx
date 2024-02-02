import ModerateurEdit from "../components/ModifierModerateur.jsx";
import { moderator } from "../constants";

const EditModerateur = () =>{
    return (
        <div className="w-full h-full flex justify-start items-start flex-col bg-grey max-md:pt-2">
            <ModerateurEdit moder={moderator} />
        </div>
      );
}

export default EditModerateur;