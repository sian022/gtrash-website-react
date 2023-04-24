import React, { useState } from 'react'

function RedeemRewardModal(props) {
    return (
    <div>
        <div className="modal fade" id="redeemRewardModal" tabIndex="-1" aria-labelledby="redeemRewardModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="redeemRewardModalLabel">Redeem Reward</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="rewardForm">
                            <div className="mb-3">
                                <label htmlFor="userId" className="form-label">User ID</label>
                                <input type="text" className="form-control" id="userId" defaultValue={props.userInfo.id} disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="userName" defaultValue={props.userInfo.name} disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="totalPoints" className="form-label">Points</label>
                                <input type="text" className="form-control" id="totalPoints" defaultValue={props.userInfo.totalPoints} disabled/>
                            </div>      
                            <div className="mb-3">
                                <label htmlFor="rewardItemIdOrName" className="form-label">Reward ID/Name</label>
                                <input type="text" className="form-control" id="rewardItemIdOrName" placeholder="Enter reward ID or name"/>
                            </div>                                     
                        </form>                                          
                    </div>
                    <button type="button" className="btn btn-primary btn-block mx-3 w-50" id="redeemRewards">
                        Redeem Reward
                    </button>
                    <div className="modal-footer mt-3">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>       
    </div>
  )
}

export default RedeemRewardModal