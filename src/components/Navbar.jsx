import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='container'>
      <ul className='nav-container'>
        <li className='nav-elements'><a href='/home'>Home</a></li>
        <li className='nav-elements'><a href='/trackcalories'>Track Calories</a></li>
        <li className='nav-elements'><a href='/searchistory'>Search History</a></li>
        <li className='nav-elements'><a href='/about'>About</a></li>
      </ul>
    </div>
  )
}

export default Navbar
