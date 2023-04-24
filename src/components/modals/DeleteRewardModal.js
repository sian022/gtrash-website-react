import React, { useRef } from 'react'

import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function DeleteRewardModal(props) {
    const closeButtonRef = useRef(null)
    const deleteReward = async(id) => {
        const rewardDoc = doc(db, "Rewards", id)
        await deleteDoc(rewardDoc)
        closeButtonRef.current.click()
    }
    return (
        <div>
            <div className="modal fade" id="deleteRewardModal" tabIndex="-1" aria-labelledby="deleteRewardModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteRewardModalLabel">Delete {props.rewardInfo.rewardName} confirmation</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete reward?                           
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={() => {deleteReward(props.rewardInfo.id)}}>Confirm delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteRewardModal