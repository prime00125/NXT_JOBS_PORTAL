import {useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {useNavigate, Navigate, Link} from 'react-router-dom'
const Header = () => {
  const nav = useNavigate()
  const goout = () => {
    Cookies.remove('jwt_token')
    nav('/login')
  }
  return (
    <div className='nav'>
      <h1>Jobs</h1>
      <div className='links'>
        <Link to='/'>
          <p>Home</p>
        </Link>

        <Link to='/jobs'>
          <p>Jobs</p>
        </Link>
      </div>
      <button className='navbtn' onClick={goout}>
        LOGOUT
      </button>
    </div>
  )
}
export default Header
