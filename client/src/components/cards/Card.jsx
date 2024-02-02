function Card({ articles }){
  return (
    <div className='h-full w-full flex flex-col justify-center font-poppins bg-[#DEDEDE]'>
      {articles.map(article => {
        return(
          <div className='h-[210px] w-[97%] bg-white m-5 rounded-[20px] py-3 sm:px-7 px-3 flex justify-center flex-col'>
            <p className='text-[#190B28] text-xl font-medium'>{article.titre}</p>
            <p className='text-[#190B28] text-xs mb-2.5'>{article.auteurs.map(auteur => {
              return(auteur.nom + " " + auteur.prenom + ", ");
            })}</p>
            <p className='text-[#190B28] lg:text-base max-h-20 overflow-hidden sm:text-sm text-xs' >Resumé : {article.resume} </p>
            <div className='lg:h-1/4 sm:h-1/5 mt-2 w-full flex justify-between '>
              <div className='flex sm:w-[60.5%] w-1/3 overflow-hidden flex-row shrink-0 h-full mt-2.5 opacity-0 sm:opacity-100'>
              {article.mot_cle.map(mot => {
                return(                <div className='bg-[#DEDEDE] lg:py-2 sm:py-1 lg:px-5 sm:px-3 rounded-full text-xs mr-1.5 shrink-0 h-4/6'>{mot}</div>);
              })}
              </div>
              <div className=' flex overflow-hidden flex-row shrink-0'>
                <div className='cursor-pointer hover:opacity-90 hover:transition-all hover:duration-150 hover:ease-in font-semibold bg-white py-2.5 lg:px-7 px-3 rounded-lg border-2 border-black lg:text-sm text-xs mx-1 shrink-0'>Télecharger</div>
                <div className='cursor-pointer hover:opacity-90 hover:transition-all hover:duration-150 hover:ease-in font-semibold bg-[#E87D00] text-white py-3 lg:px-7 px-3  rounded-lg lg:text-sm text-xs mx-1 shrink-0 '>Consulter</div>
              </div>
            </div>
          </div>
        )
      })}
      
    </div>
  )
}

export default Card