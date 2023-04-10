import React from 'react'

function SeeStoreRewardsModal() {
  return (
    <div>
        <div className="modal fade" id="seeStoreRewardsModal" tabIndex="-1" aria-labelledby="seeStoreRewardsModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="seeStoreRewardsModalLabel">View store rewards</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="seeStoreRewardsForm">
                            Coming soon!
                        </form>                                          
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SeeStoreRewardsModal