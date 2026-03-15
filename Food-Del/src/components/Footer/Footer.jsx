import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.logo} alt="Logo" />
                <p>Delicious food delivered to your doorstep.Find the best restaurants and cuisines near you. Thanks for choosing us!.You are in good hands. Again Warmly Thanks to you and Your Team.</p>    
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="facebook" />
                    <img src={assets.twitter_icon} alt="twitter" />
                    <img src={assets.linkedin_icon} alt="instagram" />
                </div>
              </div>
        <div className='footer-content-center'>
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 1234567890</li>
            <li>support@fooddel.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>© 2024 FoodDel. All rights reserved.</p>
    </div>

  )
}

export default Footer