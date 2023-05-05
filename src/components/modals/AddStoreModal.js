import React, { useState, useRef, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

import { db } from '../../firebase/firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'

function AddStoreModal() {
    const usersRef = collection(db, 'Users')
    const [snapshot, setSnapshot] = useState(null)
    const { signUpStore, user } = useUserAuth()

    const [newStoreName, setNewStoreName] = useState('')
    const [newRepresentativeName, setNewRepresentativeName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState('')
    const closeButtonRef = useRef(null)
    
    useEffect(() => {
        const getUserByEmail = async () => {
            const studentQuery = query(usersRef, where('accessLevel', '==' ,'store'), where('email', '==', newEmail))
            const studentQuerySnapshot = await getDocs(studentQuery)
            setSnapshot(studentQuerySnapshot)
        }
        getUserByEmail()
    },[newEmail])

    const createStore = async (e) => {
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
            await signUpStore(newStoreName, newRepresentativeName, newEmail, newPassword, user)
            closeButtonRef.current.click()
            
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <div className="modal fade" id="addStoreModal" tabIndex="-1" aria-labelledby="addStoreModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addStoreModalLabel">Create new store</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="addStoreForm" onSubmit={createStore}>
                                <div className="mb-3">
                                    <label htmlFor="storeName" className="form-label">Store Name</label>
                                    <input type="text" className="form-control" id="storeName" placeholder="Enter store name"
                                    onChange={(e) => {setNewStoreName(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="storeRepresentativeName" className="form-label">Representative Name</label>
                                    <input type="text" className="form-control" id="storeRepresentativeName" placeholder="Enter respresentative name" onChange={(e) => {setNewRepresentativeName(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="storeEmail" className="form-label">E-mail</label>
                                    <input type="email" className="form-control" id="storeEmail" placeholder="Enter store e-mail"
                                    onChange={(e) => {setNewEmail(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="storePassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="storePassword" placeholder="Enter store password"
                                    onChange={(e) => {setNewPassword(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="storePasswordConfirm" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="storePasswordConfirm" placeholder="Confirm store password"
                                    onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                                </div>
                                {error && <div className="alert alert-danger" role="alert">{ error }</div>}
                            </form>                                          
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                        <button type="submit" className="btn btn-primary" form="addStoreForm">Confirm store details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStoreModal