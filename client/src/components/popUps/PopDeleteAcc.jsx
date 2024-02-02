import danger from './Vector.png';

function PopLogOut() {
  return (
    <div className='h-full w-full flex justif-center bg-slate-500 p-10'>
        <div className='lg:h-[250px] h-[210px] w-[450px] bg-white border-none py-2 rounded-[20px] flex flex-col justify-evenly content-center flex-wrap'>
            <div className='flex justify-center lg:h-16 h-12'>
                <img src={danger} alt="danger logo" />
            </div>
            <div className='flex justify-center'>
                <p className='lg:text-lg font-poppins font-medium lg:w-96 w-80 lg:px-0 px-2 text-center'>Etes-vous sur de vouloir vouloir supprimer definitivement votre compte ?</p>
            </div>
            <div className='flex justify-between mt-1 px-6'>
                <button className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]'>Annuler</button>
                <button className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-5 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]'>Oui, Continuer</button>
            </div>
        </div>
    </div>
  )
}

export default PopLogOut