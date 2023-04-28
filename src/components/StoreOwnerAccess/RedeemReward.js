import React, { useState, useEffect } from 'react'

import { db } from '../../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { useUserAuth } from '../../context/UserAuthContext'

function RedeemReward() {
    const [selectedReward, setSelectedReward] = useState(null)
    const [redeemingUser, setRedeemingUser] = useState(null)
    const [rewards, setRewards] = useState([])

    const rewardsRef = collection(db, 'Rewards')

    const { user } = useUserAuth()
    useEffect(() => {
        const q = query(rewardsRef, where('storeId','==',user.uid))
        const getRewards = async() => {
            const data = await getDocs(q)
            setRewards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getRewards()
    },[])

    const handleRedeem = () => {
        //Get user with equivalent RFID
        //Update users points and subtract the selected reward points
        //If it's not enough points, show error
        console.log(redeemingUser)
    }

    const handleCardClick = (card) => {
        setSelectedReward(card)
    }

    return (
        <div>
            <div className='row'>
                <div className='col-sm-3'>
                    <input type='text' className='form-control mt-3' id="rfidInput" placeholder='Enter RFID code' onChange={(e) => {setRedeemingUser(e.target.value)}}/>
                </div>
                <div className='col-sm-9 d-flex'>
                    <div type="button" className='btn btn-primary mt-3' onClick={handleRedeem}>
                        Redeem Reward
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                {rewards.map(reward => (
                    <div key={reward.id} className='col-sm-3'>
                        <div className="card mb-4" title={reward.rewardName} onClick={() => {handleCardClick(reward.rewardName)}}>
                            <div className="card-body d-flex justify-content-center">
                                {reward.rewardName}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RedeemReward