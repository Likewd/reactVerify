import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useAuth } from '../context/UserAuthContext'
const Header = () => {
   const { logout } = useAuth()
   const navigate = useNavigate()
   const userlogout = async () => {
  
      try {
        await logout()
          navigate("/")
        } catch (error) {
    console.log(error)
        }
    
      }


   let activeStyle = {
      textDecoration: "underline",
   };
   return (
      <header className='header'>
         <div >

            <Link
               className="logo"
               to="/home"

            >
               Logo
            </Link>
         </div>
         <nav className='link'>
            <ul className='ul'>
               <li>
               </li>
               <li>
                  <NavLink
                     className="active"
                     to="/profile"
                     style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                     }
                  >
                     Profile
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/"
                     className="active"
                     style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                     }
                  >
                     login
                  </NavLink>
               </li>
               <li> 
                  <button
                     className="active  button"
                   onClick={userlogout}
                   >
                     logout
                  </button>

               </li>

            </ul>
         </nav>
      </header>
   )
}
export default Header


