import danger from './Vector.png';

function PopLogOut() {
  return (
    <div className='h-full w-full bg-black bg-opacity-30 absolute flex justify-center content-center flex-wrap'>
        <div className='lg:h-[250px] sm:h-[230px] h-[200px] sm:w-[450px] w-[300px] bg-white border-none py-2 rounded-[20px] flex flex-col justify-evenly content-center flex-wrap relative'>
            <div className='flex justify-center lg:h-16 h-10'>
                <FaExclamationTriangle className="sm:h-16 h-12 sm:w-16 w-12"/>
            </div>
            <div className='flex justify-center'>
                <p className='text- lg:text-lg font-poppins font-medium w-80 text-center'>Etes-vous sur de vouloir vous déconnecter de votre compte ?</p>
            </div>
            <div className='flex justify-between mt-1 sm:px-4'>
                <button className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-4 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#E87D00]'>Annuler</button>
                <button className='lg:text-lg text-sm font-poppins font-bold text-white lg:py-2.5 py-2 lg:px-6 px-4 rounded-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] bg-[#A7A7A7]'>Continuer</button>
            </div>
        </div>
    </div>
  )
}

export default PopLogOut