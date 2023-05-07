import React, { useState, useEffect } from 'react'

import { db } from '../../firebase/firebase'
import { collection, doc, getDocs, updateDoc, query, where, getDoc } from 'firebase/firestore'

import { useUserAuth } from '../../context/UserAuthContext'

import RedeemPageMessageModal from '../modals/RedeemPageMessageModal'

import { MoonLoader } from 'react-spinners'

function RedeemReward() {
    const [loggedInUserName, setLoggedInUserName] = useState(null)
    const [selectedReward, setSelectedReward] = useState(null)
    const [redeemingUserId, setRedeemingUserId] = useState(null)
    const [rewards, setRewards] = useState([])
    const [redeemMessage, setRedeemMessage] = useState('')
    const [error, setError] = useState(null)

    const [show, setShow] = useState(false)

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

    useEffect(() => {
        const getUser = async() => {
            const userRef = doc(db, 'Users', user.uid)
            const data = await getDoc(userRef)
            setLoggedInUserName(data.data().ownerName)
        }
        getUser()
    },[])

    const handleRedeem = async(rfid) => {
        //Get user with equivalent RFID
        setShow(true)
        const studentQuery = query(usersRef, where('accessLevel', '==' ,'student'), where('rfid', '==', rfid))
        const studentQuerySnapshot = await getDocs(studentQuery)
        //Update users points and subtract the selected reward points
        //If it's not enough points, show error
        try{
            if(studentQuerySnapshot.empty){
                setRedeemMessage('Invalid RFID')
            }else if(!selectedReward){
                setRedeemMessage("Please select a reward")
            }
            else {
                const studentData = {id: studentQuerySnapshot.docs[0].id, ...studentQuerySnapshot.docs[0].data()}
                if(studentData.totalPoints < selectedReward.rewardEquivalentPoints){
                    setRedeemMessage('Not enough points')
                }else{
                    const userRef = doc(db, 'Users', studentData.id)
                    const rewardRef = doc(db, 'Rewards', selectedReward.id)
                    await updateDoc(userRef, {totalPoints: studentData.totalPoints - selectedReward.rewardEquivalentPoints})
                    await updateDoc(rewardRef, {timesRedeemed: selectedReward.timesRedeemed+1, rewardStock: selectedReward.rewardStock-1})
                    setRedeemMessage(`${selectedReward.rewardName} redeem success for ${studentData.name}`)
                    document.getElementById('rfidInput').value = ''
                }
            }
            setSelectedReward(null)
        }catch(err){
            setError(err.message)
        }
    }

    const handleCardClick = (rewardCard) => {
        setSelectedReward(rewards.find(reward => reward.rewardName === rewardCard))
    }

    if(rewards.length === 0){
        return <div className='spinner'><MoonLoader/></div>
    }
    
    return (
        <div className='mt-4'>
            <div className="alert alert-success alert-dismissible fade show d-flex justify-content-between" role="alert">
                <strong>Hi {loggedInUserName}!</strong>
                <button type="button" className="close bg-transparent border-0 " data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
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
            <div className='mt-4 ms-1 fs-4'>
                Select a reward:
            </div>
            <div className='row mt-4'>
                {rewards.map(reward => (
                    <div key={reward.id} className='col-xl-3'>
                        <div className="card reward-cards mb-4" tabIndex={0} title={reward.rewardName} onClick={() => {handleCardClick(reward.rewardName)}}>
                            <div className="card-body d-flex justify-content-center">
                                {reward.rewardName}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <RedeemPageMessageModal show={show} redeemMessageInfo={redeemMessage}/>
        </div>
    )
}

export default RedeemReward