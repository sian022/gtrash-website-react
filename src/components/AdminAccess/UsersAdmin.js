import React from 'react'
import { DataTable } from 'simple-datatables'
import 'simple-datatables/dist/style.css'

import { useState, useRef, useEffect } from 'react'
import EditUserModal from '../modals/EditUserModal'
import DeleteUserModal from '../modals/DeleteUserModal'
import AddUserModal from '../modals/AddUserModal'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function UsersAdmin() {
    const [users, setUsers] = useState([])
    const [selectedUserEdit, setSelectedUserEdit] = useState('')
    const [selectedUserDelete, setSelectedUserDelete] = useState('')
    const studentsRef = collection(db, "Users")
    const q = query(studentsRef, where("accessLevel", "==", "student"));

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(q)
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUsers()
    }, [])

    const tableRef = useRef(null)
    useEffect(() => {
        if (users.length > 0 && tableRef.current) {
          const table = new DataTable(tableRef.current);
        }
    }, [users]);

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
                                <th>Rewards Redeemed</th>
                                <th>Total PET Bottles</th>
                                <th>Total Tin Cans</th>
                                <th>Actions</th>                         
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Total Points</th>
                                <th>Rewards Redeemed</th>
                                <th>Total PET Bottles</th>
                                <th>Total Tin Cans</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.totalPoints}</td>
                                    <td>{user.rewardsRedeemed}</td>
                                    <td>{user.totalPetBottles}</td>
                                    <td>{user.totalTinCans}</td>
                                    <td>
                                        <button 
                                        type="button" className="btn btn-primary btn-block btn-sm" title="Edit User" id="editUser" data-bs-toggle="modal" data-bs-target="#editUserModal" onClick={()=>{
                                            setSelectedUserEdit(user)
                                        }}>
                                            <i className="fa fa-pencil-square"></i>
                                        </button> &nbsp;
                                        <button type="button" className="btn btn-danger btn-block btn-sm" title="Delete User" id="deleteUser" data-bs-toggle="modal" data-bs-target="#deleteUserModal" onClick={() => {setSelectedUserDelete(user)}}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    {users && <EditUserModal userInfo={selectedUserEdit}/>}
                    <DeleteUserModal userInfo={selectedUserDelete}/>
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