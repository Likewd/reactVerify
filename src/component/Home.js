import React from 'react'
import { useAuth } from '../context/UserAuthContext'
import { Link, useNavigate } from "react-router-dom"
import Header from './Header'

const Home = () => {

  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div style={{ color: "white", fontSize: "50px" }}>Well Come to the home page</div>
    </>
  )
}

export default Home