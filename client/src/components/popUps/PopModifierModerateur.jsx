import { FaExclamationTriangle } from "react-icons/fa";
import React from 'react';

function PopModifierModerateur({Close, Confirmer}) {
  return (
    <div className='h-full  w-full bg-black bg-opacity-30 absolute'>
        <div className='lg:h-[250px] h-[230px] w-[450px] bg-white border-none py-2 rounded-[20px] flex flex-col justify-evenly content-center flex-wrap relative top-1/4 left-1/3'>
            <div className='flex justify-center lg:h-16 h-12'>
                <FaExclamationTriangle className="h-16 w-16"/>
            </div>
            <div className='flex justify-center pt-3'>
                <p className='lg:text-lg font-poppins font-medium lg:w-96 w-96 lg:px-0 px-2 text-center'>Etes-vous sur de vouloir vouloir sauvgarder les changement apporter sur ce compte ?</p>
            </div>
            <div className='flex justify-evenly mt-1 px-6'>
                <button onClick={Close} className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]'>Annuler</button>
                <button onClick={Confirmer} className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]'>Enregistrer</button>
            </div>
        </div>
    </div>
  )
}

export default PopModifierModerateur