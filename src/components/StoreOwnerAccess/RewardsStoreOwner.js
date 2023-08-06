import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'simple-datatables'
import 'simple-datatables/dist/style.css'

import AddRewardModal from '../modals/AddRewardModal'
import EditRewardModal from '../modals/EditRewardModal'
import DeleteRewardModal from '../modals/DeleteRewardModal'

import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

import { useUserAuth } from '../../context/UserAuthContext'

import { MoonLoader } from 'react-spinners'

function RewardsStoreOwner() {
    const { user } = useUserAuth()

    const [rewards, setRewards] = useState([])
    const [selectedRewardEdit, setSelectedRewardEdit] = useState('')
    const [selectedRewardDelete, setSelectedRewardDelete] = useState('')
    const rewardsRef = collection(db, 'Rewards')
    const tableRef = useRef(null)
    useEffect(() => {
        const getRewards = async () => {
            const q = query(rewardsRef, where('storeId','==',user.uid))
            await onSnapshot(q, (querySnapshot) => {
                const rewardsData = []
                querySnapshot.forEach((doc) => {
                    rewardsData.push({...doc.data(), id: doc.id})
                })
                setRewards(rewardsData)
              })
        }
        getRewards()
    }, [])

    useEffect(() => {
        if(rewards.length > 0 && tableRef.current){
            new DataTable(tableRef.current)
        }
    },[rewards])

    if(rewards.length === 0){
        return <div className='spinner'><MoonLoader/></div>
    }

    return (
        <div>
        <h1 className="mt-4" style={{marginBottom: "20px"}}>Rewards</h1>
            <div className="card mb-4">
                <div className="card-body table-responsive">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Equivalent Points</th>
                                <th>Stock</th>
                                <th>Attachment</th>
                                <th>Actions</th>                                    
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Equivalent Points</th>
                                <th>Stock</th>
                                <th>Attachment</th>
                                <th>Actions</th>  
                            </tr>
                        </tfoot>
                        <tbody>
                            {rewards.map(reward => (
                                <tr key={reward.id}>
                                    <td>{reward.rewardName}</td>
                                    <td>{reward.rewardEquivalentPoints}</td>
                                    <td>{reward.rewardStock}</td>
                                    <td>No Attachment</td>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-block btn-sm" title="Edit Reward" data-bs-toggle="modal" data-bs-target="#editRewardModal" onClick={() => {setSelectedRewardEdit(reward)}}>
                                            <i className="fa fa-pencil-square"></i>
                                        </button> &nbsp;
                                        <button type="button" className="btn btn-danger btn-block btn-sm" title="Delete Reward" data-bs-toggle="modal" data-bs-target="#deleteRewardModal" onClick={() => {setSelectedRewardDelete(reward)}}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <EditRewardModal rewardInfo = {selectedRewardEdit}/>
                    <DeleteRewardModal rewardInfo = {selectedRewardDelete}/>
                </div>
            </div>
                            
            <div className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addRewardModal">
                Create new reward
            </div>
            <AddRewardModal/>
        </div>
    )
}

export default RewardsStoreOwner