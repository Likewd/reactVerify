import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../context/UserAuthContext'
import './Signup.css'
const VerifyEmail = () => {
    const navigate = useNavigate()
    const {  emailVerification  } = useAuth()
    const [err, setError] = useState("")
    const [code, setCode] = useState("")
   
    const SubmitHandler = async (e) => {
        e.preventDefault()

        try {
            await emailVerification()
        } catch (error) {
            
        }
      }
  return (
    <div className='box'>
    {
            err && <p className='error'>{err}</p>
    }
    <form onSubmit={SubmitHandler} className="form">
        <h2>Verify Your Email</h2>
        <div className="inputfield">
            <input type="text"  
            placeholder="Enter Code Here" value={code} name='FullName' onChange={e=>(setCode(e.target.value))} />

            <p style={{color:"#fff", fontSize:"10px", marginTop:'3px',letterSpacing:"1px"}}>
                Please check your email you receve A verification code
            </p>
        </div>  
        <div className="inputfield">
            <input type="submit"  value={"Verify"}></input>
        </div>
        <p className="forget">Already Have an account? <Link to={"/"} className="link">{"login"}</Link></p>
    </form>

</div>
  )
}

export default VerifyEmail