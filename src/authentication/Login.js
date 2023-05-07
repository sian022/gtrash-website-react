import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserAuth } from '../context/UserAuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'

function Login(props) {
    const usersRef = collection(db, 'Users')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [users, setUsers] = useState(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login, user } = useUserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersRef)
            setUsers(data.docs.map((doc) => ({ email: doc.data().email, accessLevel: doc.data().accessLevel, id: doc.id })))
        }
        getUsers()
    },[])
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        try{
            await login(email, password)
            setIsLoggedIn(true)
            // Find the user object with the matching email
            const loggedInUser = users.find((user) => user.email === email)

            //Get access level of user
            const accessLevel = loggedInUser.accessLevel;

            if(accessLevel == 'student'){
                navigate('/users')
            }else if (accessLevel == 'store'){
                navigate('/storeowner')
            }else if (accessLevel == 'admin'){
                navigate('/admin')
            }
        }catch(err){
            setError(err.message)
        }
    }
    return (
    <div className='loginPage bg-secondary'>
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content" style={{overflow: 'hidden'}}>
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">G-Trash</h3></div>
                                <div className="card-body">
                                    {error && <div className="alert alert-danger" role="alert">{ error }</div>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" autoComplete='off' id="inputEmail" type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" autoComplete='off' id="inputPassword" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end mt-4 mb-0">
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                    </form>
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