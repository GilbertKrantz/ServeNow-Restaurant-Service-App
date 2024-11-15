import React from 'react'
import { IMenu } from '../../../../interfaces/Menu.interfaces'

const MenuCard = (props: IMenu) => {
    const { menu } = props
  
    
  
    return (
      <>
        {menu &&
          <div className='w-full'>
            <img src={"https://utfs.io/f/" + menu.imageKey} alt="" />
            <div className='flex justify-between items-center'>
                <p className="px-5 pt-5 font-bold text-xl">{menu.name}</p>
                <p className='text-[#FFB0B0] px-5 pt-5 font-bold text-xl'>{menu.price/1000} K</p>
            </div>
            <p className="px-5 text-base">{menu.description}</p>
          </div> 
        }
        <hr className='bg-[#FFD09B] my-[7%] mx-5 h-[0.8%]' />
      </>
    )
  }
  
  export default MenuCard