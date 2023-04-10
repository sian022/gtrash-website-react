import React from 'react'

function AddStoreModal() {
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
                        <form id="addStoreForm">
                            <div className="mb-3">
                                <label htmlFor="storeName" className="form-label">Store Name</label>
                                <input type="text" className="form-control" id="storeName" placeholder="Enter store name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storeRepresentativeName" className="form-label">Representative Name</label>
                                <input type="text" className="form-control" id="storeRepresentativeName" placeholder="Enter respresentative name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storeEmail" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="storeEmail" placeholder="Enter store e-mail"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storePassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="storePassword" placeholder="Enter store password"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storePasswordConfirm" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="storePasswordConfirm" placeholder="Confirm store password"/>
                            </div>
                        </form>                                          
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" form="addStoreForm">Confirm store details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddStoreModal