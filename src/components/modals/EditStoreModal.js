import React, { useState, useRef, useEffect } from 'react'

import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function EditStoreModal(props) {
    const usersRef = collection(db, 'Users')
    const [snapshot, setSnapshot] = useState(null)

    const [newStoreName, setNewStoreName] = useState('')
    const [newRepresentativeName, setNewRepresentativeName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState('')
    const closeButtonRef = useRef(null)

    useEffect(() => {
        setNewStoreName(props.storeInfo.storeName)
        setNewRepresentativeName(props.storeInfo.ownerName)
        setNewEmail(props.storeInfo.email)
        setNewPassword(props.storeInfo.password)
        setConfirmPassword(props.storeInfo.password)
    },[props])
    
    useEffect(() => {
        const getUserByEmail = async () => {
            const studentQuery = query(usersRef, where('accessLevel', '==' ,'store'), where('email', '==', newEmail))
            const studentQuerySnapshot = await getDocs(studentQuery)
            setSnapshot(studentQuerySnapshot)
        }
        getUserByEmail()
    },[newEmail])

    const updateStore = async(id) => {
        if(newPassword.length < 6){
            setError('Must be at least 6 characters')
            return
        }else if(newPassword != confirmPassword){
            setError('Passwords do not match')
            return
        }else if(!snapshot.empty && snapshot.docs[0].data().email != newEmail){
            setError('Email already exists')
            return
        }
        try{
            const storeDoc = doc(db, 'Users', id)
            const newFields = {storeName: newStoreName, ownerName: newRepresentativeName, email: newEmail, password:newPassword}
            updateDoc(storeDoc, newFields)
            closeButtonRef.current.click()
        } catch(err){
            setError(err.message)
        }
    }

    return (
        <div>
            <div className="modal fade" id="editStoreModal" tabIndex="-1" aria-labelledby="editStoreModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editStoreModalLabel">Edit Store Details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="editStoreForm" onSubmit={(e) => {
                                e.preventDefault()
                                updateStore(props.storeInfo.id)
                            }}>
                                <div className="mb-3">
                                    <label htmlFor="editStoreId" className="form-label">Store ID</label>
                                    <input type="text" className="form-control" id="editStoreId" placeholder="Enter store ID" defaultValue={props.storeInfo?.id} disabled/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editStoreName" className="form-label">Store Name</label>
                                    <input type="text" className="form-control" id="editStoreName" placeholder="Enter store name" defaultValue={props.storeInfo?.storeName} onChange={(e) => {setNewStoreName(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="representativeName" className="form-label">Representative Name</label>
                                    <input type="text" className="form-control" id="representativeName" placeholder="Enter representative name" defaultValue={props.storeInfo?.ownerName} onChange={(e) => {setNewRepresentativeName(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editEmail" className="form-label">E-mail</label>
                                    <input type="email" className="form-control" id="editEmail" placeholder="Enter e-mail"  required defaultValue={props.storeInfo?.email} onChange={(e)=>{setNewEmail(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="editPassword" placeholder="Enter password"  required defaultValue={props.storeInfo?.password} onChange={(e)=>{setNewPassword(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editConfirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="editConfirmPassword" placeholder="Confirm password"  required defaultValue={props.storeInfo?.password} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                                </div>
                                {error && <div className="alert alert-danger" role="alert">{ error }</div>}                                               
                            </form>                                          
                        </div>
                        <div className="modal-footer mt-3">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                            <button type="submit" className="btn btn-primary" form="editStoreForm">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default EditStoreModal