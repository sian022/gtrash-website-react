import React from 'react'

function EditUserModal() {
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
                        <form id="editUserForm">
                            <div className="mb-3">
                                <label htmlFor="editUserId" className="form-label">User ID</label>
                                <input type="text" className="form-control" id="editUserId" placeholder="Enter user ID"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editUserName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="editUserName" placeholder="Enter user name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editTotalPoints" className="form-label">Total Points</label>
                                <input type="number" className="form-control" id="editTotalPoints" placeholder="Enter total points" disabled/>
                            </div>      
                            <div className="mb-3">
                                <label htmlFor="editRewardRedeemed" className="form-label">Rewards Redeemed</label>
                                <input type="number" className="form-control" id="editRewardRedeemed" placeholder="Enter rewards redeemed total"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editTotalPetBottles" className="form-label">Total PET Bottles</label>
                                <input type="number" className="form-control" id="editTotalPetBottles" placeholder="Enter total PET bottles"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editTotalTinCans" className="form-label">Total Tin Cans</label>
                                <input type="number" className="form-control" id="editTotalTinCans" placeholder="Enter total tin cans"/>
                            </div>                                                
                        </form>                                          
                    </div>
                    <div className="modal-footer mt-3">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" form="editUserForm">Save changes</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default EditUserModal