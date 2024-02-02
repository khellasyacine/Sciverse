import { useParams } from "react-router-dom";
import ModifierProfile from "../components/ModifierProfile.jsx";

const EditProfile = () => {
  const { profile_id } = useParams();

  return (
    <div className="w-full h-full flex justify-start items-start flex-col bg-grey max-md:pt-2">
      <ModifierProfile profile_id={profile_id} />
    </div>
  );
};

export default EditProfile;
