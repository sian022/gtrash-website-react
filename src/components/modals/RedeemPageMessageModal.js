import React, {useState, useEffect} from 'react'

function RedeemPageMessageModal(props) {
  const [redeemMessage, setRedeemMessage] = useState(null)
  
  useEffect(() => {
    if (props.redeemMessageInfo) {
      setRedeemMessage(props.redeemMessageInfo.redeemMessage);
    }
  }, [props.redeemMessageInfo]);

  return (
    <div>
      <div class="modal fade" id="redeemPageModal" tabindex="-1" aria-labelledby="redeemPageModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Redeem message</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {redeemMessage}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RedeemPageMessageModal