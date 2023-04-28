import React, { useState, useEffect, useRef } from 'react'

import { collection, updateDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

import { useUserAuth } from '../../context/UserAuthContext'

function RedeemRewardModal(props) {
    const { user } = useUserAuth()

    const [rewardRedeemed, setRewardRedeemed] = useState(null)
    const [totalPoints, setTotalPoints] = useState(null)
    const [error, setError] = useState(null)

    const rewardsRef = collection(db, 'Rewards')
    const closeButtonRef = useRef(null)

    useEffect(() => {
        setTotalPoints(props.userInfo.totalPoints)
    },[props])

    const redeemReward = (id) => {
        const getReward = async() => {
            const q = query(rewardsRef, where('rewardName','==',rewardRedeemed), where('storeId','==',user.uid))
            const querySnapshot = await getDocs(q)
            const userDoc = doc(db, 'Users', id)

            if(querySnapshot.empty){
                setError('No reward of such name')
            }else{
                const rewardPoints = (querySnapshot.docs[0].data().rewardEquivalentPoints)
                if(totalPoints >= rewardPoints){
                    await updateDoc(userDoc, {totalPoints: totalPoints-rewardPoints})
                    closeButtonRef.current.click()
                }else{
                    setError('Not enough points')
                }
            }
        }
        getReward()
    }

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
                        <form id="rewardForm" onSubmit={(e) => {
                            e.preventDefault()
                            redeemReward(props.userInfo.id)
                        }}>
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
                                <label htmlFor="rewardItemIdOrName" className="form-label">Reward name</label>
                                <input type="text" className="form-control" id="rewardItemIdOrName" placeholder="Enter reward ID or name" onChange={(e) => {setRewardRedeemed(e.target.value)}}/>
                            </div>
                            {error && <div className="alert alert-danger" role="alert">{ error }</div>}                                  
                        </form>                                          
                    </div>
                    
                    <div className="modal-footer mt-3">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                        <button type="submit" className="btn btn-primary" form='rewardForm'>
                            Redeem Reward
                        </button>
                    </div>
                </div>
            </div>
        </div>       
    </div>
  )
}

export default RedeemRewardModal