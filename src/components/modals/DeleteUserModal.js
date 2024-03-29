import React, { useRef } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

import { useUserAuth } from '../../context/UserAuthContext'

function DeleteUserModal(props) {
    const { deleteUserAccount } = useUserAuth()

    const closeButtonRef = useRef(null)
    const deleteUser = async(id) => {
        const userDoc = doc(db, "Users", id)
        await deleteDoc(userDoc)
        // await deleteUserAuth(id, user.uid)
        closeButtonRef.current.click()
    }
    return (
    <div>
        <div className="modal fade" id="deleteUserModal" tabIndex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="deleteUserModalLabel">Delete {props.userInfo?.name} confirmation</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete user?                     
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                    <button type="button" className="btn btn-danger" onClick={()=>{deleteUserAccount(props.userInfo.id)}}>Confirm delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteUserModal