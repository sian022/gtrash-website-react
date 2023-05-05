import React, { useState, useRef, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

import { db } from '../../firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

function AddUserModal() {
    const usersRef = collection(db, 'Users')
    const [snapshot, setSnapshot] = useState(null)
    const { signUpStudent, user } = useUserAuth()

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newRfid, setNewRfid] = useState('')

    const [error, setError] = useState('')
    const closeButtonRef = useRef(null)

    useEffect(() => {
        const getUserByEmail = async () => {
            const studentQuery = query(usersRef, where('accessLevel', '==' ,'student'), where('email', '==', newEmail))
            const studentQuerySnapshot = await getDocs(studentQuery)
            setSnapshot(studentQuerySnapshot)
        }
        getUserByEmail()
    },[newEmail])

    const createUser = async (e) => {
        e.preventDefault()
        
        if(newPassword.length < 6){
            setError('Must be at least 6 characters')
            return
        }else if(newPassword != confirmPassword){
            setError('Passwords do not match')
            return
        }else if(!snapshot.empty){
            setError('Email already exists')
            return
        }
        try {
            await signUpStudent(newName, newEmail, newPassword, newRfid, user)
            closeButtonRef.current.click()
            
          } catch (err) {
            setError(err.message)
          }
    }

    return (
    <div>
        <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addUserModalLabel">Create new user</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="addUserForm" onSubmit={createUser}>
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="userName" placeholder="Enter user name" 
                                onChange={(e) => {setNewName(e.target.value)}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userEmail" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="userEmail" placeholder="Enter user e-mail"
                                onChange={(e) => {setNewEmail(e.target.value)}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="userPassword" placeholder="Enter user password"
                                onChange={(e) => {setNewPassword(e.target.value)}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userPasswordConfirm" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="userPasswordConfirm" placeholder="Confirm user password"
                                onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userPasswordConfirm" className="form-label">RFID</label>
                                <input type="text" className="form-control" id="userRfid" placeholder="Confirm rfid"
                                onChange={(e) => {setNewRfid(e.target.value)}}/>
                            </div>

                            {error && <div className="alert alert-danger" role="alert">{ error }</div>}
                        </form>                                          
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                    <button type="submit" className="btn btn-primary" form="addUserForm">Confirm user details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddUserModal