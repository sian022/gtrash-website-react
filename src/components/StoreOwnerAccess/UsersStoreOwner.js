import React from 'react'
import { DataTable } from 'simple-datatables'
import 'simple-datatables/dist/style.css'

import { useState, useRef, useEffect } from 'react'
import dummy from '../../dummy'
import RedeemRewardModal from '../modals/RedeemRewardModal'

function UsersStoreOwner() {
    //Simple Datatable Hooks
    const tableRef = useRef(null)

    useEffect(() => {
        const table = new DataTable(tableRef.current);
    },[])

    //Set Modal Values
    const [selectedUser, setSelectedUser] = useState({})

    const handleRedeemRewardClick = (e) => {
        const button = e.target;
        const row = button.closest('tr');
        const userId = row.cells[0].textContent;
        const userName = row.cells[1].textContent;
        const totalPoints = row.cells[2].textContent;
        console.log(userId)
        setSelectedUser({
            userId,
            userName,
            totalPoints,
        });
        document.getElementById("userId").value = userId;
        document.getElementById("userName").value = userName;  
        document.getElementById("totalPoints").value = totalPoints; 
    }

    return (
        <div>
        <h1 className="mt-4" style={{marginBottom: "20px"}}>Users</h1> 
            <div className="card mb-4">
                <div className="card-body table-responsive">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Total Points</th>
                                <th>Rewards Redeemed</th>
                                <th>Total PET Bottles</th>
                                <th>Total Tin Cans</th>
                                <th>Actions</th>                         
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Total Points</th>
                                <th>Rewards Redeemed</th>
                                <th>Total PET Bottles</th>
                                <th>Total Tin Cans</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {dummy.map(dumm => (
                                <tr key={dumm.userId}>
                                    <td>{dumm.userId}</td>
                                    <td>{dumm.userName}</td>
                                    <td>{dumm.totalPoints}</td>
                                    <td>{dumm.rewardsRedemeed}</td>
                                    <td>{dumm.totalPetBottles}</td>
                                    <td>{dumm.totalTinCans}</td>
                                    <td>
                                        <button 
                                        type="button" className="btn btn-primary btn-block btn-sm" title="Redeem Reward" id="redeemReward" data-bs-toggle="modal" data-bs-target="#redeemRewardModal" onClick={handleRedeemRewardClick}>
                                            <i className="fa-solid fa-clipboard-list"></i> Redeem Reward
                                        </button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <RedeemRewardModal/>
                </div>
            </div>
        </div>
    )
}

export default UsersStoreOwner