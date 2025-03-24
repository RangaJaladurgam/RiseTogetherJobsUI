import React from 'react';
import Logo from '../assets/rtn-logo.png'
import './Util.css'

function AppBar() {
  return (
    <div>
        <div className='appbar-logo'>
            <img src={Logo} alt=""/>
        </div>
    </div>
  )
}

export default AppBar