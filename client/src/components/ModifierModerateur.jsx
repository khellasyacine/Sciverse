import { useState } from "react";
import Pop from "./popUps/PopModifierModerateur.jsx";
import { useNavigate } from "react-router-dom";
import {routes} from '../routes/routes.js'
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

function ModifierModerateur(){
    const {userProfile, setUserProfile} = useContext(UserContext);
    const moder = userProfile;
    const [nom,Setnom] = useState(moder.firstName);
    const [prenom,Setprenom] = useState(moder.lastName);
    const [surnom,Setsurnom] = useState(moder.username);
    const [mail,Setmail] = useState(moder.email);

    const navigate = useNavigate();

    const [Display,SetDisplay] = useState(false);
    const Close = () =>{
        SetDisplay(false);
    }
    const Confirm = () =>{
        SetDisplay(!Display);
    }

    const handleChangeNom = (event) => {
        Setnom(event.target.value);
    }
    const handleChangePreom = (event) => {
        Setprenom(event.target.value);
    }
    const handleChangeSurnom = (event) => {
        Setsurnom(event.target.value);
    }
    const handleChangeMail = (event) => {
        Setmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const ModifiedUser={
            "email" : mail,
            "password" : userProfile.password,
            "firstName" : prenom,
            "lastName" : nom,
            "nature" : userProfile.nature,
            "username" : surnom,
            "profilePicture": userProfile.profilePicture,
        };
        setUserProfile(ModifiedUser);       
        console.log(ModifiedUser)
        SetDisplay(!Display);
    }

    const handleSubmitPop = (event) => {
        event.preventDefault();
        setUserProfile(ModifiedUser);        
        console.log(ModifiedUser)
        SetDisplay(!Display);
        navigate(-1);
    }

    const handleAnnuler = (event) => {
        event.preventDefault();     
        navigate(-1);
    }

    return (
        <div className="w-full relative">
            {Display && <Pop Close={Close} Confirmer={handleSubmitPop} />}
            <div className="w-full py-4 sm:px-6 flex flex-col flex-wrap justify-center content-center bg-[#dedede] font-poppins">
                <form autoComplete="off" action="post" className="w-full flex flex-col flex-wrap justify-center content-center">
                    <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1 sm:w-1/2 w-5/6">Nom:</p>
                    <input type="text" defaultValue={moder.firstName} onChange={handleChangeNom} className="py-2.5 sm:pl-8 pl-4 sm:w-1/2 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4"/>
                    <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Prenom:</p>
                    <input type="text" defaultValue={moder.lastName} onChange={handleChangePreom} className="py-2.5 sm:pl-8 pl-4 sm:w-1/2 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4"/>
                    <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Nom d'utilisateur:</p>
                    <input type="text" defaultValue={moder.username} onChange={handleChangeSurnom} className="py-2.5 sm:pl-8 pl-4 sm:w-1/2 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4"/>
                    <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Email:</p>
                    <input type="text" defaultValue={moder.email} onChange={handleChangeMail} className="py-2.5 sm:pl-8 pl-4 sm:w-1/2 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-10"/>
                    <div className='flex justify-evenly mb-4'>
                        <button onClick={handleAnnuler} className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-4 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]'>Annuler</button>
                        <button onClick={handleSubmit} className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-4 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]'>Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
  };
  export default ModifierModerateur;