import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>ExploreMenu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your craving and elevate your doing experience,One delecious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return(
              <div key={index} className="explore-menu-list-item" onClick={()=>setCategory((prev)=>prev===item.menu_name?'All':item.menu_name)}>
                <img src={item.menu_image} alt="menu-images" className={category===item.menu_name ? 'active':''} />
                <p>{item.menu_name}</p>
              </div>
            )
          })
        }
      </div>
      <hr/>
      </div>
  )
}

export default ExploreMenu