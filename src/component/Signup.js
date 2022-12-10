import { AuthErrorCodes } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../context/UserAuthContext'
import './Signup.css'
const Signup = () => {
    const navigate = useNavigate()
    const { SignUp } = useAuth()
    const [err, setError] = useState("")
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const UserHandler = (e) => {
        const { name, value } = e.target;
        setUser((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault()
        const { email, password, confirmPassword, FullName } = user
        if (password == "" || confirmPassword == "" || email == "" || FullName == "") {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("please fill All the field ")
        }
        else if (password !== confirmPassword) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password does not match")
        }
        else if (!password.length >= 6 || !confirmPassword.length >= 6) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password Must be Greater then 6 Length")
        }
        else {
            try {
                await SignUp(email, password)
                alert("WellCome New User Create successfully")
                navigate('/')
            } catch (err) {
                if (err.code === "auth/email-already-in-use") {
                    setInterval(() => {
                        setError("")
                    }, 5000)
                    setError("email already in use try another email")
                }
                else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {

                    setInterval(() => {
                        setError("")
                    }, 5000)
                    setError("Password Must be 6 charecter")
                }

                else {
                    setError(err.message)
                }
            }
        }
    }
    return (


        <div className='box'>
            {
                err && <p className='error'>{err}</p>

            }

            <form onSubmit={SubmitHandler} className="form">
                <h2>Registration Form</h2>
                <div className="inputfield">
                    <input type="text" placeholder="Email" value={user.email} name='email' onChange={UserHandler} />
                </div>

                <div className="inputfield">
                    <input type="password" placeholder="Password" value={user.password} name='password' onChange={UserHandler} />
                </div>
                <div className="inputfield">
                    <input type="password" placeholder="Confirm Password" value={user.confirmPassword} name='confirmPassword' onChange={UserHandler} />
                </div>
                <div className="inputfield">
                    <input type="submit" />
                </div>
                <p className="forget">Already Have an account? <Link to={"/"} className="link">{"login"}</Link></p>
            </form>

        </div>

    )
}

export default Signup