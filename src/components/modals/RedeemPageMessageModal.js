import React, {useState, useEffect} from 'react'

function RedeemPageMessageModal(props) {
  return (
    <div>
      <div className="modal fade" id="redeemPageModal" tabIndex="-1" aria-labelledby="redeemPageModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Redeem message</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {props.redeemMessageInfo}
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

export default RedeemPageMessageModal