import React, { useState, useRef, useEffect } from 'react'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function EditRewardModal(props) {
    const [rewardName, setRewardName] = useState('')
    const [rewardEquivalentPoints, setRewardEquivalentPoints] = useState(null)
    const [rewardStock, setRewardStock] = useState(null)

    const [error, setError] = useState('')
    const closeButtonRef = useRef(null)

    useEffect(() => {
        setRewardName(props.rewardInfo.rewardName)
        setRewardEquivalentPoints(props.rewardInfo.rewardEquivalentPoints)
        setRewardStock(props.rewardInfo.rewardStock)
    },[props])
    
    const updateReward = async(id) => {
        try{
            const rewardDoc = doc(db, 'Rewards', id)
            const newFields = {rewardName: rewardName, rewardEquivalentPoints: parseInt(rewardEquivalentPoints), rewardStock: parseInt(rewardStock)}
            await updateDoc(rewardDoc, newFields)
            closeButtonRef.current.click()
        } catch(err){
            setError(err.message)
        }
    }

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
                            <form id="editRewardForm" onSubmit={(e) => {
                                e.preventDefault()
                                updateReward(props.rewardInfo.id)
                            }}>
                                <div className="mb-3">
                                    <label htmlFor="rewardId" className="form-label">Reward ID</label>
                                    <input type="text" className="form-control" id="editRewardId" disabled defaultValue={props.rewardInfo.id}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rewardName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="editRewardName" placeholder="Enter reward name" defaultValue={props.rewardInfo.rewardName} onChange={(e) => {setRewardName(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rewardEquivalentPoints" className="form-label">Equivalent Points</label>
                                    <input type="text" className="form-control" id="editRewardEquivalentPoints" placeholder="Enter reward equivalent points" defaultValue={props.rewardInfo.rewardEquivalentPoints} onChange={(e) => {setRewardEquivalentPoints(e.target.value)}}/>
                                </div>      
                                <div className="mb-3">
                                    <label htmlFor="rewardStock" className="form-label">Stock</label>
                                    <input type="text" className="form-control" id="editRewardStock" placeholder="Enter reward stock" defaultValue={props.rewardInfo.rewardStock} onChange={(e) => {setRewardStock(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rewardStock" className="form-label">Attachment</label>
                                    <input type="file" className="form-control" id="editRewardAttachment" accept="image/*"/>
                                </div>                                           
                            </form>                                          
                        </div>
                        <div className="modal-footer mt-3">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                            <button type="submit" className="btn btn-primary" form="editRewardForm">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default EditRewardModal