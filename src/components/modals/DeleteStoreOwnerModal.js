import React from 'react'

function DeleteStoreOwnerModal() {
  return (
    <div>
        <div className="modal fade" id="deleteStoreOwnerModal" tabIndex="-1" aria-labelledby="deleteStoreOwnerModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="deleteStoreOwnerModalLabel">Delete store confirmation</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete store?                           
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger">Confirm delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteStoreOwnerModal