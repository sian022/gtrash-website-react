import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'simple-datatables'
import 'simple-datatables/dist/style.css'

import RedeemRewardModal from '../modals/RedeemRewardModal'

import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

import { MoonLoader } from 'react-spinners'

function UsersStoreOwner() {
    const [users, setUsers] = useState([])
    const [selectedUserRewardRedeem, setSelectedUserRewardRedeem] = useState('')
    const studentsRef = collection(db, "Users")
    const q = query(studentsRef, where("accessLevel", "==", "student"))

    useEffect(() => {
        const getUsers = async () => {
            await onSnapshot(q, (querySnapshot) => {
                const usersData = []
                querySnapshot.forEach((doc) => {
                    usersData.push({...doc.data(), id: doc.id})
                })
                setUsers(usersData)
            })
        }
        getUsers()
    }, [])

    const tableRef = useRef(null)
    useEffect(() => {
        if(users.length > 0 && tableRef.current){
            new DataTable(tableRef.current)
        }
    },[users])

    if(users.length === 0) {
        return <div className='spinner'><MoonLoader/></div>
    }

    return (
        <div>
        <h1 className="mt-4" style={{marginBottom: "20px"}}>Users</h1> 
            <div className="card mb-4">
                <div className="card-body table-responsive">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total Points</th>
                                <th>Total Rewards Redeemed</th>
                                <th>Actions</th>                         
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Total Points</th>
                                <th>Total Rewards Redeemed</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.totalPoints}</td>
                                    <td>{user.timesRedeeming}</td>
                                    <td>
                                        <button 
                                        type="button" className="btn btn-primary btn-block btn-sm" title="Redeem Reward" id="redeemReward" data-bs-toggle="modal" data-bs-target="#redeemRewardModal" onClick={()=>{
                                            setSelectedUserRewardRedeem(user)
                                        }}>
                                            <i className="fa-solid fa-clipboard-list" ></i> Redeem Reward
                                        </button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <RedeemRewardModal userInfo={selectedUserRewardRedeem}/>
                </div>
            </div>
        </div>
    )
}

export default UsersStoreOwner