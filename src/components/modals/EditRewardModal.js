import React from 'react'

function EditRewardModal() {
  return (
    <div>
        <div className="modal fade" id="editRewardModal" tabIndex="-1" aria-labelledby="editRewardModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="editRewardModalLabel">Edit Reward Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="editRewardForm">
                            <div className="mb-3">
                                <label htmlFor="rewardId" className="form-label">Reward ID</label>
                                <input type="text" className="form-control" id="editRewardId" placeholder="Enter reward ID"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rewardName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="editRewardName" placeholder="Enter reward name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rewardEquivalentPoints" className="form-label">Equivalent Points</label>
                                <input type="text" className="form-control" id="editRewardEquivalentPoints" placeholder="Enter reward equivalent points"/>
                            </div>      
                            <div className="mb-3">
                                <label htmlFor="rewardStock" className="form-label">Stock</label>
                                <input type="text" className="form-control" id="editRewardStock" placeholder="Enter reward stock"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rewardStock" className="form-label">Attachment</label>
                                <input type="file" className="form-control" id="editRewardAttachment" placeholder="Enter reward stock" accept="image/*"/>
                            </div>                                           
                        </form>                                          
                    </div>
                    <div className="modal-footer mt-3">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" form="editRewardForm">Save changes</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default EditRewardModal