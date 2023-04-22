import React, { useRef } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function DeleteStoreOwnerModal(props) {
    const closeButtonRef = useRef(null)
    const deleteStore = async(id) => {
        const storeDoc = doc(db, "Stores", id)
        await deleteDoc(storeDoc)
        closeButtonRef.current.click()
    }
  return (
    <div>
        <div className="modal fade" id="deleteStoreOwnerModal" tabIndex="-1" aria-labelledby="deleteStoreOwnerModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="deleteStoreOwnerModalLabel">Delete {props.storeInfo.storeName} confirmation</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete store?                           
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                    <button type="button" className="btn btn-danger" onClick={() => {deleteStore(props.storeInfo.id)}}>Confirm delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteStoreOwnerModal