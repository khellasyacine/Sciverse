import { useState } from "react";
import Pop from "./popUps/PopModifierMotDePasseERR.jsx";
import { useNavigate } from "react-router-dom";

function ModifierMotDePasse(){
    const [mdp,Setmdp] = useState("");
    const [mdpc,Setmdpc] = useState("");

    const navigate = useNavigate();

    const [Display,SetDisplay] = useState(false);
    const Close = () =>{
        SetDisplay(false);
        Setmdp("");
        Setmdpc("");
    }

    const handleChangeMdp = (event) => {
        Setmdp(event.target.value);
    }
    const handleChangeMdpc = (event) => {
        Setmdpc(event.target.value);
    }

    const verifyMdp = (mdp1,mdp2) =>{
        if(mdp1 == mdp2){
            return true;
        }
        else{
            return false;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!verifyMdp(mdp,mdpc)){
            SetDisplay(!Display);
        };
        // Setuser({
        //     "nom" : nom,
        //     "prenom" : prenom,
        //     "surnom" : surnom,
        //     "role" : "moderateur",
        //     "mail" : mail,
        //     "photo": photo
        // });       
    }
    const handleAnnuler = (event) => {
        event.preventDefault();     
        navigate(-1);
    }

    return (
        <div className="w-full relative h-full">
            {Display && <Pop Close={Close} />}
            <div className="w-full py-4 px-6 flex flex-col flex-wrap justify-center content-center bg-[#dedede] font-poppins">
                <form autoComplete="off" action="post" className="w-full flex flex-col flex-wrap justify-center content-center">
                    <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1 sm:w-1/2 w-5/6">Nouveau Mot de passe:</p>
                    <input type="password" onChange={handleChangeMdp} className="py-2.5 pl-8 sm:w-1/2 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 w-full"/>
                    <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Confirmation du nouveau Mot de passe:</p>
                    <input type="password" onChange={handleChangeMdpc} className="py-2.5 pl-8 sm:w-1/2 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 w-full"/>
                    <div className='flex justify-evenly mb-4 sm:mt-0 mt-4'>
                        <button onClick={handleAnnuler} className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]'>Annuler</button>
                        <button onClick={handleSubmit} className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]'>Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
  };
  export default ModifierMotDePasse;