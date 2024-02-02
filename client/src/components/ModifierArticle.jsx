import { LiaPenFancySolid } from "react-icons/lia";
import {length, split, useContext, useState} from 'react';
import { ArticleContext } from "../contexts/ArticleContext";
import { useNavigate } from "react-router-dom";
import Pop from "./popUps/PopModifierArticle";

function ArticleDetails(){
    const {ArticleDisplay} = useContext(ArticleContext)
    const article = ArticleDisplay;
    const [texte,setTexte] = useState(article.full_text);
    const [resumer,SetResumer] = useState(article.abstract);
    const [titre,SetTitre] = useState(article.title);
    const [auteurnom,SetAuteurNom] = useState();
    const [auteurprenom,SetAuteurPrenom] = useState();
    const [institutionnom,SetInstitutionNom] = useState();

    const navigate = useNavigate();

    const [Display,SetDisplay] = useState(false);
    const Close = () =>{
        SetDisplay(false);
    }

    const handleChangeTitre = (event) => {
        SetTitre(event.target.value);
    }
    const handleChangeResumer = (event) => {
        SetResumer(event.target.value);
    }
    const handleChangeTexte = (event) => {
        setTexte(event.target.value);
    }
    const handleChangeAuteurNom = (event) => {
        SetAuteurNom(event.target.value);
    }
    const handleChangeAuteurPrenom = (event) => {
        SetAuteurPrenom(event.target.value);
    }
    const handleChangeInstitutionsName = (event) => {
        SetInstitutionNom(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();   
        SetDisplay(!Display);
    }

    const handleSubmitPop = (event) => {
        event.preventDefault();      
        SetDisplay(!Display);
        navigate(-1);
    }

    const handleAnnuler = (event) => {
        event.preventDefault();     
        navigate(-1);
    }

  return (
    <div className="w-full h-full relative">
        {Display && <Pop Close={Close} Confirmer={handleSubmitPop} />}
        <div className="W-5/6 py-6 px-6 flex flex-col flex-wrap justify-center content-center bg-[#DEDEDE] font-poppins">
            <form autoComplete="off" action="post" className="w-full flex flex-col flex-wrap justify-center content-center">
                <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Titre:</p>
                <input type="text" defaultValue={titre} onChange={handleChangeTitre} className="py-2.5 px-5 w-5/6 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-wrap flex-wrap flex "/>
                <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Nom Auteur:</p>
                <input type="text" onChange={handleChangeAuteurNom} className="py-2.5 px-5 w-5/6 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-wrap flex-wrap flex "/>
                <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Prenom Auteur:</p>
                <input type="text" onChange={handleChangeAuteurPrenom} className="py-2.5 px-5 w-5/6 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-wrap flex-wrap flex "/>
                <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Nom Institution:</p>
                <input type="text" onChange={handleChangeInstitutionsName} className="py-2.5 px-5 w-5/6 rounded-full bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-wrap flex-wrap flex "/>
                <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Resumer:</p>
                <textarea rows={7} defaultValue={resumer} onChange={handleChangeResumer} className="py-2.5 px-5 w-5/6 rounded-[20px] bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4 text-justify"/>
                <p className=" font-poppins text-xs pl-1 text-[#190B28] my-1">Nom d'utilisateur:</p>
                <textarea rows={15} defaultValue={texte} onChange={handleChangeTexte} className="py-2.5 px-5 w-5/6 rounded-[20px] bordre-none bg-[#E87D00] bg-opacity-25 text-base mb-4"/>
                <div className='flex justify-evenly my-4 w-1/2 mx-auto'>
                    <button onClick={handleAnnuler} className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]'>Annuler</button>
                    <button onClick={handleSubmit} className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]'>Enregistrer</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ArticleDetails;