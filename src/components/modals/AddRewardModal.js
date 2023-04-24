import React, { useState, useRef, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function AddRewardModal() {
    const [storeId, setStoreId] = useState('')
    const [newName, setNewName] = useState('')
    const [equivalentPoints, setEquivalentPoints] = useState(null)
    const [rewardStock, setRewardStock] = useState (null)

    const rewardsRef = collection(db, 'Rewards')
    const [error, setError] = useState('')
    const closeButtonRef = useRef(null)

    const { user } = useUserAuth()

    useEffect(() => {
        setStoreId(user.uid)
    },[user])

    const createReward = async (e) => {
        e.preventDefault()
        try{
            await addDoc(rewardsRef, {
                storeId : storeId,
                rewardName: newName,
                rewardEquivalentPoints: parseInt(equivalentPoints),
                rewardStock : parseInt(rewardStock)
            })
            closeButtonRef.current.click()
        }catch(err){
            setError(err.message)
        }
    }
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
                            <form id="rewardForm" onSubmit={createReward}>
                                <div className="mb-3">
                                    <label htmlFor="rewardName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="rewardName" placeholder="Enter reward name" onChange={(e) => {setNewName(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rewardEquivalentPoints" className="form-label">Equivalent Points</label>
                                    <input type="number" className="form-control" id="rewardEquivalentPoints" placeholder="Enter reward points" onChange={(e) => {setEquivalentPoints(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rewardStock" className="form-label">Stock</label>
                                    <input type="number" className="form-control" id="rewardStock" placeholder="Enter reward points" onChange={(e) => {setRewardStock(e.target.value)}}/>
                                    </div>
                                <div className="mb-3">
                                    <label htmlFor="rewardAttachment" className="form-label">Attachment</label>
                                    <input type="file" className="form-control" id="rewardAttachment" accept="image/*"/>
                                </div>
                            </form>                                          
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                        <button type="submit" className="btn btn-primary" form="rewardForm">Confirm reward details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRewardModal