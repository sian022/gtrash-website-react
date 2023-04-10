import React from 'react'

function AddRewardModal() {
  return (
    <div>
        <div className="modal fade" id="addRewardModal" tabIndex="-1" aria-labelledby="addRewardModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addRewardModalLabel">Create new reward</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="rewardForm">
                            <div className="mb-3">
                                <label htmlFor="rewardName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="rewardName" placeholder="Enter reward name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rewardEquivalentPoints" className="form-label">Equivalent Points</label>
                                <input type="number" className="form-control" id="rewardEquivalentPoints" placeholder="Enter reward points"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rewardStock" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="rewardStock" placeholder="Enter reward points"/>
                                </div>
                            <div className="mb-3">
                                <label htmlFor="rewardAttachment" className="form-label">Attachment</label>
                                <input type="file" className="form-control" id="rewardAttachment" accept="image/*"/>
                            </div>
                        </form>                                          
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" form="rewardForm">Confirm reward details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddRewardModal