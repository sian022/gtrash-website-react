import React, { useState, useEffect } from 'react'

import { db } from '../../firebase/firebase'
import { collection, doc, getDocs, updateDoc, query, where } from 'firebase/firestore'

import { useUserAuth } from '../../context/UserAuthContext'

import RedeemPageMessageModal from '../modals/RedeemPageMessageModal'

function RedeemReward() {
    const [selectedReward, setSelectedReward] = useState(null)
    const [redeemingUserId, setRedeemingUserId] = useState(null)
    const [rewards, setRewards] = useState([])
    const [redeemMessage, setRedeemMessage] = useState(null)

    const [redeemMessageModalShow, setRedeemMessageModalShow] = useState(false)
    
    const rewardsRef = collection(db, 'Rewards')
    const usersRef = collection(db, 'Users')

    const { user } = useUserAuth()
    useEffect(() => {
        const q = query(rewardsRef, where('storeId','==',user.uid))
        const getRewards = async() => {
            const data = await getDocs(q)
            setRewards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getRewards()
    },[])

    const handleRedeem = async(rfid) => {
        //Get user with equivalent RFID

        const studentQuery = query(usersRef, where('accessLevel', '==' ,'student'), where('rfid', '==', rfid))
        const studentQuerySnapshot = await getDocs(studentQuery)
        //Update users points and subtract the selected reward points
        //If it's not enough points, show error
        try{
            if(studentQuerySnapshot.empty){
                alert('Invalid RFID')
                setRedeemMessage('Invalid RFID')
            }else if(!selectedReward){
                alert('Please select a reward')
                setRedeemMessage("Please select a reward")
            }
            else {
                const studentData = {id: studentQuerySnapshot.docs[0].id, ...studentQuerySnapshot.docs[0].data()}
                if(studentData.totalPoints < selectedReward.rewardEquivalentPoints){
                    alert('Not enough points')
                    setRedeemMessage('Not enough points')
                }else{
                    const userRef = doc(db, 'Users', studentData.id)
                    await updateDoc(userRef, {totalPoints: studentData.totalPoints - selectedReward.rewardEquivalentPoints})
                    alert(`Reward ${selectedReward.rewardName} redeem success for ${studentData.name}`)
                    setRedeemMessage(`Reward ${selectedReward.rewardName} redeem success for ${studentData.name}`)
                }
            }
            setSelectedReward(null)
        }catch(err){
            console.log(err.message)
        }
    }

    const handleCardClick = (rewardCard) => {
        setSelectedReward(rewards.find(reward => reward.rewardName === rewardCard))
    }


    return (
        <div>
            <div className='row'>
                <div className='col-sm-3'>
                    <input type='text' className='form-control mt-3' autoComplete="off" id="rfidInput" placeholder='Enter RFID code' onChange={(e) => {setRedeemingUserId(e.target.value)}}/>
                </div>
                <div className='col-sm-9 d-flex'>
                    <div type="button" className='btn btn-primary mt-3' data-bs-toggle="modal" data-bs-target="#redeemPageModal" onClick={() => {handleRedeem(redeemingUserId)}}>
                        Redeem Reward
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                {rewards.map(reward => (
                    <div key={reward.id} className='col-sm-3'>
                        <div className="card reward-cards mb-4" tabIndex={0} title={reward.rewardName} onClick={() => {handleCardClick(reward.rewardName)}}>
                            <div className="card-body d-flex justify-content-center">
                                {reward.rewardName}
                            </div>
                        </div>
                    </div>
                ))}
            
            {redeemMessage}
            </div>

            <RedeemPageMessageModal redeemMessageInfo={redeemMessage}/>
        </div>
    )
}

export default RedeemReward