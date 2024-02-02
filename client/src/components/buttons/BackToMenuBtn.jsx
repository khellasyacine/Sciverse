import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const BackToMenuBtn = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="w-fit px-3 text-white rounded-xl flex justify-center items-center gap-1.5 font-poppins text-2xl font-bold max-lg:text-lg"
      >
        <FaArrowLeft />
        Go back
      </button>
    </div>
  );
};

export default BackToMenuBtn;
