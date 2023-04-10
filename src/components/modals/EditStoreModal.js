import React from 'react'

function EditStoreModal() {
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
                        <form id="editStoreForm">
                            <div className="mb-3">
                                <label htmlFor="editStoreId" className="form-label">Store ID</label>
                                <input type="text" className="form-control" id="editStoreId" placeholder="Enter store ID"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editStoreName" className="form-label">Store Name</label>
                                <input type="text" className="form-control" id="editStoreName" placeholder="Enter store name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="representativeName" className="form-label">Representative Name</label>
                                <input type="text" className="form-control" id="representativeName" placeholder="Enter representative name"/>
                            </div>                                                 
                        </form>                                          
                    </div>
                    <div className="modal-footer mt-3">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" form="editStoreForm">Save changes</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default EditStoreModal