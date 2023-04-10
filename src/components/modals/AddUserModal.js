import React from 'react'

function AddUserModal() {
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
                        <form id="addUserForm">
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="userName" placeholder="Enter user name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userEmail" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="userEmail" placeholder="Enter user e-mail"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="userPassword" placeholder="Enter user password"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userPasswordConfirm" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="userPasswordConfirm" placeholder="Confirm user password"/>
                            </div>
                        </form>                                          
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" form="addUserForm">Confirm user details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddUserModal