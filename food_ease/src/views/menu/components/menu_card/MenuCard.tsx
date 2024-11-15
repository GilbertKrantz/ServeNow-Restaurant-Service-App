import React from 'react'
import { IMenu } from '../../../../interfaces/Menu.interfaces'

const MenuCard = (props: IMenu) => {
    const { menu } = props
  
    
  
    return (
      <>
        {menu &&
          <div className='w-full'>
            <p className="px-5 pt-5 font-bold text-xl">{menu.name}</p>
            <p className="px-5 text-base">{menu.description}</p>
            {/* <img src={"https://utfs.io/f/" + menu.imageKey} alt="" /> */}
          </div> 
        }
      </>
    )
  }
  
  export default MenuCard