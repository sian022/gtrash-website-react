import React from 'react'
import { DataTable } from 'simple-datatables'
import 'simple-datatables/dist/style.css'

import { useState, useRef, useEffect } from 'react'
import dummy from '../../dummy'
import EditUserModal from '../modals/EditUserModal'
import DeleteUserModal from '../modals/DeleteUserModal'
import AddUserModal from '../modals/AddUserModal'

function UsersAdmin() {
    //Simple Datatable Hooks
    const tableRef = useRef(null)

    useEffect(() => {
        const table = new DataTable(tableRef.current);
    },[])

    //Set Modal Values
    const [selectedUser, setSelectedUser] = useState({})

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
                                        type="button" className="btn btn-primary btn-block btn-sm" title="Edit User" id="editUser" data-bs-toggle="modal" data-bs-target="#editUserModal">
                                            <i className="fa fa-pencil-square"></i>
                                        </button> &nbsp;
                                        <button type="button" className="btn btn-danger btn-block btn-sm" title="Delete User" id="deleteUser" data-bs-toggle="modal" data-bs-target="#deleteUserModal"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    <EditUserModal/>
                    <DeleteUserModal/>
                </div>
            </div>

            <div className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addUserModal">
                Create new user
            </div>
            <AddUserModal/>
        </div>
    )
}

export default UsersAdmin