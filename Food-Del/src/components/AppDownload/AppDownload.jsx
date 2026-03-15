import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/>The FoodDel App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="play store logo" />
            <img src={assets.app_store} alt='app store logo'/>
        </div>
        </div>
  )
}

export default AppDownload