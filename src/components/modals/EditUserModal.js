import React, { useState, useRef, useEffect } from 'react'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function EditUserModal(props) {
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [rfid, setRfid] = useState('')

    const [error, setError] = useState('')
    const closeButtonRef = useRef(null)

    useEffect(() => {
        setNewName(props.userInfo.name)
        setNewEmail(props.userInfo.email)
        setNewPassword(props.userInfo.password)
    },[props])
    
    const updateUser = async(id) => {
        if(newPassword.length < 6){
            setError('Must be at least 6 characters')
            return
        }else if(newPassword != confirmPassword){
            setError('Passwords do not match')
            return
        }
        try{
            const userDoc = doc(db, 'Users', id)
            const newFields = {name: newName, email: newEmail, password:newPassword, rfid:rfid}
            await updateDoc(userDoc, newFields)
            closeButtonRef.current.click()
        } catch(err){
            setError(err.message)
        }
    }
    return (
        <div>
            <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editUserModalLabel">Edit User Details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="editUserForm" onSubmit={(e) => {
                                e.preventDefault()
                                updateUser(props.userInfo.id)
                            }}>
                                <div className="mb-3">
                                    <label htmlFor="editUserId" className="form-label">User ID</label>
                                    <input type="text" className="form-control" id="editUserId" placeholder="Enter user ID" disabled defaultValue={props.userInfo?.id}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editUserName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="editUserName" placeholder="Enter user name"  required defaultValue={props.userInfo?.name} onChange={(e)=>{setNewName(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editEmail" className="form-label">E-mail</label>
                                    <input type="email" className="form-control" id="editEmail" placeholder="Enter e-mail"  required defaultValue={props.userInfo?.email} onChange={(e)=>{setNewEmail(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="editPassword" placeholder="Enter password"  required defaultValue={props.userInfo?.password} onChange={(e)=>{setNewPassword(e.target.value)}}/>
                                </div>    
                                <div className="mb-3">
                                    <label htmlFor="editConfirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="editConfirmPassword" placeholder="Confirm password"  required defaultValue={props.userInfo?.password} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editRfid" className="form-label">RFID</label>
                                    <input type="text" className="form-control" id="editRfid" placeholder="Enter RFID"  required defaultValue={props.userInfo?.rfid} onChange={(e)=>{setRfid(e.target.value)}}/>
                                </div>    
                                {error && <div className="alert alert-danger" role="alert">{ error }</div>}                 
                            </form>                                          
                        </div>
                        <div className="modal-footer mt-3">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                            <button type="submit" className="btn btn-primary" form="editUserForm">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default EditUserModal