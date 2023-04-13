import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useUserAuth } from '../context/UserAuthContext'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useUserAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        try{
            await login(email, password)
            navigate('/admin')
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
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                <div className="card-body">
                                    {error && <div className="alert alert-danger" role="alert">{ error }</div>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputPassword" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                            <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <a className="small">Forgot Password?</a>
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center py-3">
                                    <Link to='/signup'>
                                        <div className="small">Need an account? Sign up!</div>
                                    </Link>
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

export default Login