import React from 'react';
import Logo from '../assets/rtn-logo.png'
import './Util.css'
import MenuBar from './MenuBar';

function HeaderBar() {
  return (
    <div>
        <div className='appbar-logo'>
            <img src={Logo} alt=""/>
        </div>
        <MenuBar/>
    </div>
  )
}

export default HeaderBar