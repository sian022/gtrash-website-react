import React from 'react'
import { DataTable } from 'simple-datatables'
import 'simple-datatables/dist/style.css'

import { useRef, useEffect } from 'react'
import rewardsDummy from '../../rewardsDummy'
import AddRewardModal from '../modals/AddRewardModal'
import EditRewardModal from '../modals/EditRewardModal'
import DeleteRewardModal from '../modals/DeleteRewardModal'

function RewardsStoreOwner() {
    const tableRef = useRef(null)

    useEffect(() => {
        const table = new DataTable(tableRef.current);
    },[])

    return (
        <div>
        <h1 className="mt-4" style={{marginBottom: "20px"}}>Rewards</h1>
            <div className="card mb-4">
                <div className="card-body table-responsive">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Reward ID</th>
                                <th>Name</th>
                                <th>Equivalent Points</th>
                                <th>Stock</th>
                                <th>Attachment</th>
                                <th>Actions</th>                                    
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Reward ID</th>
                                <th>Agent</th>
                                <th>Equivalent Points</th>
                                <th>Stock</th>
                                <th>Attachment</th>
                                <th>Actions</th>  
                            </tr>
                        </tfoot>
                        <tbody>
                            {rewardsDummy.map(rewardsDumm => (
                                <tr key={rewardsDumm.rewardId}>
                                    <td>{rewardsDumm.rewardId}</td>
                                    <td>{rewardsDumm.rewardName}</td>
                                    <td>{rewardsDumm.equivalentPoints}</td>
                                    <td>{rewardsDumm.stock}</td>
                                    <td>{rewardsDumm.stock}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-block btn-sm" title="Edit Reward" data-bs-toggle="modal" data-bs-target="#editRewardModal">
                                            <i className="fa fa-pencil-square"></i>
                                        </button> &nbsp;
                                        <button type="button" className="btn btn-danger btn-block btn-sm" title="Delete Reward" data-bs-toggle="modal" data-bs-target="#deleteRewardModal">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <EditRewardModal/>
                    <DeleteRewardModal/>
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