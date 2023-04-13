import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { signUp } = useUserAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        try{
            await signUp(email, password)
            navigate('/')
        }catch(err){
            setError(err.message)
        }
    }
    return (
    <div className='bg-secondary'>
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Register</h3></div>
                                <div className="card-body">
                                    {error && <div className="alert alert-danger" role="alert">{ error }</div>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" onChange={(e)=> setEmail(e.target.value)}/>
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputPassword" type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <Link to='/'>
                                                <div className="small">Return to Login</div>
                                            </Link>
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center py-3">
                                    {/* */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </div>
        </div> 
    </div>
    )
}

export default Signup